import * as supertest from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { CreateGerenteDto } from '../../src/application/dto/gerente/create-gerente.dto'; // Importando o DTO
import { UpdateGerenteDto } from '../../src/application/dto/gerente/update-gerente.dto'; // Importando o DTO

describe('GerenteController (e2e)', () => {
  let app: INestApplication;
  let gerenteId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/gerente/criar (POST)', async () => {
    const createGerenteDto: CreateGerenteDto = {
      nome: 'Bernadete Alves',
      dataNascimento: '1986-08-12',
      email: 'bernadete@gmail.com',
      telefone: '11 98765-4321',
      endereco: 'Rua das Flores, 123',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '12246001',
      cpf: '123.456.789-00',
      rendaSalarial: 5000,
      statusAtivo: true,
      contas: [], 
    };

    const response = await supertest(app.getHttpServer())
      .post('/gerente/criar')
      .send(createGerenteDto)
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('id');
    gerenteId = response.body.id;
    expect(response.body.nome).toBe(createGerenteDto.nome);
  });

  it('/gerente/:id (GET)', async () => {
    const response = await supertest(app.getHttpServer())
      .get(`/gerente/${gerenteId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    console.log('Resposta do GET:', response.body);

    expect(response.body).toHaveProperty('id', gerenteId);
    expect(response.body.nome).toBe('Bernadete Alves');
  });

  it('/gerente/:id (PATCH)', async () => {
    const updateGerenteDto: UpdateGerenteDto = {
      nome: 'Bernadete Serafim Alves',
    };

    await supertest(app.getHttpServer())
      .patch(`/gerente/atualizar/${gerenteId}`)
      .send(updateGerenteDto)
      .expect(200)
      .expect('Content-Type', /json/);

    const updatedResponse = await supertest(app.getHttpServer())
      .get(`/gerente/${gerenteId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(updatedResponse.body).toHaveProperty('id', gerenteId);
    expect(updatedResponse.body.nome).toBe(updateGerenteDto.nome);
  });

  afterAll(async () => {
    await app.close();
  });
});
