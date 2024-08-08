import * as supertest from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('GerenteController (e2e) - Associar Cliente', () => {
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
        contas: [],
      })
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('id');
    gerenteId = response.body.id;
    expect(response.body.nome).toBe('Bernadete Alves');
  });

  it('/gerente/associarcliente/:gerenteId (POST)', async () => {
    const cliente = {
      nome: 'Juliano Martins',
      dataNascimento: '1990-04-03',
      email: 'juli@gmail.com',
      telefone: '12 91234-5698',
      endereco: 'Avenida Paulista, 1010',
      cidade: 'São Paulo',
      estado: 'SP',
      cpf: '985.653.321-02',
      rendaSalarial: 3000,
      statusAtivo: false,
      contas: [],
    };
  
    const response = await supertest(app.getHttpServer())
      .post(`/gerente/associarcliente/${gerenteId}`)
      .send(cliente)
      .expect(201)  
      .expect('Content-Type', /json/);
  
    console.log('Resposta do POST:', response.body);
  
    expect(response.body).toHaveProperty('id', gerenteId);
    expect(response.body.clientes).toContainEqual(cliente);
  });
  

  afterAll(async () => {
    await app.close();
  });
});
