import * as supertest from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { CreateClienteDto } from '../../src/application/dto/cliente/create-cliente.dto';
import { UpdateClienteDto } from '../../src/application/dto/cliente/update-cliente.dto';

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
    const createClienteDto: CreateClienteDto = {
      nome: 'Luana Cardoso',
      dataNascimento: '1986-08-12',
      email: 'luana@gmail.com',
      telefone: '12 99856-1234',
      endereco: 'Rua Machado de Assis, 123, Apto 45',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '12246001',
      cpf: '36596845600',
      rendaSalarial: 3000,
      statusAtivo: true,
      conta: [],
    };

    const response = await supertest(app.getHttpServer())
      .post('/cliente/adicionar')
      .send(createClienteDto)
      .expect(201)
      .expect('Content-Type', /json/);

    console.log('Resposta do POST:', response.body);

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
