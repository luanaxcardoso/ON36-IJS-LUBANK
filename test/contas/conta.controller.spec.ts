import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ContaController } from '../../src/adapters/controllers/conta.controller';
import { ContaService } from '../../src/application/services/conta.service';
import { TipoConta } from '../../src/domain/enums/tiposconta.enum';
import { Conta } from '../../src/db/entities/contas/conta.entity';

describe('ContaController (e2e)', () => {
  let app: INestApplication;
  let mockContaService: Partial<ContaService>;

  beforeEach(async () => {
    mockContaService = {
      criarConta: jest.fn(),
      obterConta: jest.fn(),
      obterContas: jest.fn(),
      atualizarConta: jest.fn(),
      removerConta: jest.fn(),
      removerContasPorCliente: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ContaController],
      providers: [{ provide: ContaService, useValue: mockContaService }],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/conta/criar (POST) deve criar uma conta com sucesso', async () => {
    const contaMock: Conta = {
      id: 1,
      saldo: 1000,
      clienteId: 1,
      tipo: TipoConta.CONTA_CORRENTE,
    } as any;
    mockContaService.criarConta = jest.fn().mockResolvedValue(contaMock);

    return request(app.getHttpServer())
      .post('/conta/criar')
      .send({
        tipo: TipoConta.CONTA_CORRENTE,
        id: 1,
        saldo: 1000,
        clienteId: 1,
        chequeEspecial: 500,
        rendimentoMensal: 2.5,
      })
      .expect(201)
      .expect(contaMock);
  });

  it('/conta/:id (GET) deve retornar uma conta existente', async () => {
    const contaMock: Conta = {
      id: 1,
      saldo: 1000,
      clienteId: 1,
      tipo: TipoConta.CONTA_CORRENTE,
    } as any;
    mockContaService.obterConta = jest.fn().mockResolvedValue(contaMock);

    return request(app.getHttpServer())
      .get('/conta/1')
      .expect(200)
      .expect(contaMock);
  });

  it('/conta/:id (GET) deve lançar NotFoundException se a conta não for encontrada', async () => {
    mockContaService.obterConta = jest.fn().mockResolvedValue(null);

    return request(app.getHttpServer()).get('/conta/1').expect(404).expect({
      statusCode: 404,
      message: 'Conta com ID 1 não encontrada.',
      error: 'Not Found',
    });
  });

  it('/conta (GET) deve retornar todas as contas', async () => {
    const contasMock: Conta[] = [
      {
        id: 1,
        saldo: 1000,
        clienteId: 1,
        tipo: TipoConta.CONTA_CORRENTE,
      } as any,
      {
        id: 2,
        saldo: 2000,
        clienteId: 2,
        tipo: TipoConta.CONTA_POUPANCA,
      } as any,
    ];
    mockContaService.obterContas = jest.fn().mockResolvedValue(contasMock);

    return request(app.getHttpServer())
      .get('/conta')
      .expect(200)
      .expect(contasMock);
  });

  it('/conta/atualizar/:id (PATCH) deve atualizar uma conta com sucesso', async () => {
    const contaMock: Conta = {
      id: 1,
      saldo: 1000,
      clienteId: 1,
      tipo: TipoConta.CONTA_CORRENTE,
    } as any;
    mockContaService.atualizarConta = jest.fn().mockResolvedValue(contaMock);

    return request(app.getHttpServer())
      .patch('/conta/atualizar/1')
      .send({ tipo: TipoConta.CONTA_CORRENTE })
      .expect(200)
      .expect(contaMock);
  });

  it('/conta/atualizar/:id (PATCH) deve lançar NotFoundException ao atualizar uma conta não existente', async () => {
    mockContaService.atualizarConta = jest.fn().mockResolvedValue(null);

    return request(app.getHttpServer())
      .patch('/conta/atualizar/1')
      .send({ tipo: TipoConta.CONTA_CORRENTE })
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Conta com ID 1 não encontrada.',
        error: 'Not Found',
      });
  });

  it('/conta/remover/:id (DELETE) deve remover uma conta com sucesso', async () => {
    mockContaService.removerConta = jest.fn().mockResolvedValue(undefined);

    return request(app.getHttpServer())
      .delete('/conta/remover/1')
      .expect(200)
      .expect({ message: 'Conta com ID 1 removida com sucesso.' });
  });

  it('/conta/removerporcliente/:clienteId (DELETE) deve remover contas por cliente com sucesso', async () => {
    mockContaService.removerContasPorCliente = jest
      .fn()
      .mockResolvedValue(undefined);

    return request(app.getHttpServer())
      .delete('/conta/removerporcliente/1')
      .expect(200)
      .expect({
        message: 'Contas associadas ao cliente com ID 1 removidas com sucesso.',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
