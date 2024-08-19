import * as supertest from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module'; 
import { CreateClienteDto } from '../../src/application/dto/cliente/create-cliente.dto';
import { UpdateClienteDto } from '../../src/application/dto/cliente/update-cliente.dto';

describe('ClienteController (e2e)', () => {
  let app: INestApplication;
  let clientId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/cliente/adicionar (POST)', async () => {
    const createClienteDto: CreateClienteDto = {
      nome: 'Luana Cardoso',
      dataNascimento: '1987-08-06',
      email: 'luana@gmail.com',
      telefone: '1299799979',
      endereco: 'Rua das Flores, 123',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '12246001',
      cpf: '12345678901',
      rendaSalarial: 5000,
      statusAtivo: true,
      conta: [],
    };

    const response = await supertest(app.getHttpServer())
      .post('/cliente/adicionar')
      .send(createClienteDto)
      .expect(201)
      .expect('Content-Type', /json/);

    clientId = response.body.id; 
    console.log('Cliente adicionado:', response.body);
  });

  it('/cliente/:id (GET)', async () => {
    const response = await supertest(app.getHttpServer())
      .get(`/cliente/${clientId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    console.log('Cliente encontrado:', response.body);
  });

  it('/cliente/atualizar/:id (PATCH)', async () => {
    const updateClienteDto: UpdateClienteDto = {
      nome: 'Luana Aparecida Cardoso',
      cep: '12345678',
    };

    const response = await supertest(app.getHttpServer())
      .patch(`/cliente/atualizar/${clientId}`)
      .send(updateClienteDto)
      .expect(200)
      .expect('Content-Type', /json/);

    console.log('Cliente atualizado:', response.body);
  });

  it('/cliente/deletar/:id (DELETE)', async () => {
    const response = await supertest(app.getHttpServer())
      .delete(`/cliente/deletar/${clientId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body.message).toBe(`Cliente com ID ${clientId} removido com sucesso.`);
    console.log('Cliente deletado:', response.body);
  });
});
