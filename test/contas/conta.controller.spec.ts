import * as supertest from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { TipoConta } from '../../src/domain/enums/tiposconta.enum';

describe('ContaController (e2e)', () => {
  let app: INestApplication;
  let contaId: number;
  let clienteId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const clienteResponse = await supertest(app.getHttpServer())
      .post('/cliente/adicionar')
      .send({
        nome: 'Luana Cardoso',
        dataNascimento: '1986-08-12',
        email: 'luana@gmail.com',
        telefone: '12 99856-1234',
        endereco: 'Rua Machado de Assis, 123, Apto 45',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '12246001',
        cpf: '365.968.456-00',
        rendaSalarial: 3000,
        statusAtivo: true,
        conta: [],
      })
      .expect(201)
      .expect('Content-Type', /json/);

    clienteId = clienteResponse.body.id;
  });

  it('/conta/criar (POST)', async () => {
    const response = await supertest(app.getHttpServer())
      .post('/conta/criar')
      .send({
        tipo: TipoConta.CONTA_CORRENTE,
        id: 1,
        saldo: 1000,
        clienteId: clienteId,
        chequeEspecial: 500,
      })
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('id');
    contaId = response.body.id;
    expect(response.body.saldo).toBe(1000);
  });

  it('/conta/:id (GET)', async () => {
    const response = await supertest(app.getHttpServer())
      .get(`/conta/${contaId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    console.log('Resposta do GET:', response.body);

    expect(response.body).toHaveProperty('id', contaId);
    expect(response.body.saldo).toBe(1000);
  });

  it('/conta/atualizar/:id (PATCH)', async () => {
    await supertest(app.getHttpServer())
      .patch(`/conta/atualizar/${contaId}`)
      .send({ tipo: TipoConta.CONTA_POUPANCA })
      .expect(200)
      .expect('Content-Type', /json/);

    const updatedResponse = await supertest(app.getHttpServer())
      .get(`/conta/${contaId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(updatedResponse.body).toHaveProperty('id', contaId);
    expect(updatedResponse.body.tipo).toBe(TipoConta.CONTA_POUPANCA);
  });

  it('/conta/remover/:id (DELETE)', async () => {
    await supertest(app.getHttpServer())
      .delete(`/conta/remover/${contaId}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({ message: `Conta removida com sucesso.` });

    await supertest(app.getHttpServer()).get(`/conta/${contaId}`).expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
