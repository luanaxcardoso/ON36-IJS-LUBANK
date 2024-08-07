import * as supertest from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('ClienteController (e2e)', () => {
  let app: INestApplication;
  let clienteId: number; 

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cliente/adicionar (POST)', async () => {
    const response = await supertest(app.getHttpServer())
      .post('/cliente/adicionar')
      .send({
        nome: 'Luana Cardoso',
        dataNascimento: '1986-08-12',
        email: 'luana@gmail.com',
        telefone: '12 99856-1234',
        endereco: 'Rua Machado de Assis, 123, Apto 45',
        cidade: 'São Paulo',
        estado: 'SP',
        cpf: '365.968.456-00',
        rendaSalarial: 3000,
        statusAtivo: true,
        conta: []
      })
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('id');
    clienteId = response.body.id;
    expect(response.body.nome).toBe('Luana Cardoso');
  });

  it('/cliente/:id (GET)', async () => {
    const response = await supertest(app.getHttpServer())
      .get(`/cliente/${clienteId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    console.log('Resposta do GET:', response.body);

    expect(response.body).toHaveProperty('id', clienteId);
    expect(response.body.nome).toBe('Luana Cardoso');
  });

  it('/cliente/:id (PATCH)', async () => {
    await supertest(app.getHttpServer())
      .patch(`/cliente/atualizar/${clienteId}`)
      .send({ nome: 'Luana Aparecida Cardoso' })
      .expect(200)
      .expect('Content-Type', /json/);

    const updatedResponse = await supertest(app.getHttpServer())
      .get(`/cliente/${clienteId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(updatedResponse.body).toHaveProperty('id', clienteId);
    expect(updatedResponse.body.nome).toBe('Luana Aparecida Cardoso');
  });

  it('/cliente/deletar/:id (DELETE)', async () => {
    await supertest(app.getHttpServer())
      .delete(`/cliente/deletar/${clienteId}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({ message: `Cliente com ID ${clienteId} removido com sucesso.` });

    await supertest(app.getHttpServer())
      .get(`/cliente/${clienteId}`)
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
