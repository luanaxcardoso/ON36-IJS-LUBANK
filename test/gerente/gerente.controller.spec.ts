import * as supertest from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { GerenteService } from '../../src/application/services/gerente.service';
import { CreateGerenteDto } from '../../src/application/dto/gerente/create-gerente.dto';
import { Gerente } from '../../src/domain/models/gerente.model';


const mockGerenteService = {
  criarGerente: jest.fn().mockImplementation((dto: CreateGerenteDto) => {
    return {
      id: 1,
      ...dto,
    } as Gerente;
  }),
  buscarGerentes: jest.fn().mockResolvedValue([
    {
      id: 1,
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
    } as Gerente,
  ]),
};

describe('GerenteController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(GerenteService)
      .useValue(mockGerenteService) 
      .compile();

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
    expect(response.body.nome).toBe(createGerenteDto.nome);
  });

  it('/gerente (GET)', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/gerente')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(1); 
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('nome');
    expect(response.body[0].nome).toBe('Bernadete Alves');
  });

  afterAll(async () => {
    await app.close();
  });
});
