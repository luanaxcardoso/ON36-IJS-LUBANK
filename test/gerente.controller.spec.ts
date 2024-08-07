import * as supertest from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

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
    const response = await supertest(app.getHttpServer())
      .post('/gerente/criar')
      .send({
        nome: 'Bernadete Alves',
        dataNascimento: '1986-08-12',
        email: 'bernadete@gmail.com',
        telefone: '11 98765-4321',
        endereco: 'Rua das Flores, 123',
        cidade: 'São Paulo',
        estado: 'SP',
        cpf: '123.456.789-00',
        statusAtivo: true,
        contas: []
      })
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('id');
    gerenteId = response.body.id;
    expect(response.body.nome).toBe('Bernadete Alves');
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

  afterAll(async () => {
    await app.close();
  });
});
