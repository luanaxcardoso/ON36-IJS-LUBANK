import { Test, TestingModule } from '@nestjs/testing';
import { ContaController } from '../src/controllers/conta.controller';
import { ContaService } from '../src/services/conta.service';
import { TipoConta } from '../src/enums/tiposconta.enum';
import { Conta } from '../src/models/contas/conta.model';

describe('ContaController', () => {
  let controller: ContaController;
  let service: ContaService;

  beforeEach(async () => {
    const mockContaService = {
      criarConta: jest.fn(),
      obterConta: jest.fn(),
      obterContas: jest.fn(),
      atualizarConta: jest.fn(),
      removerConta: jest.fn(),
      removerContasPorCliente: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContaController],
      providers: [
        {
          provide: ContaService,
          useValue: mockContaService,
        },
      ],
    }).compile();

    controller = module.get<ContaController>(ContaController);
    service = module.get<ContaService>(ContaService);
  });

  it('Deve chamar o método criarConta', () => {
    const conta: Conta = {
      id: 1,
      tipo: TipoConta.CONTA_CORRENTE,
      saldo: 1000,
      clienteId: 1,
    };
    const chequeEspecial = 500;
    const rendimentoMensal = undefined;

    controller.criarConta(
      conta.tipo,
      conta.id,
      conta.saldo,
      conta.clienteId,
      chequeEspecial,
      rendimentoMensal
    );

    expect(service.criarConta).toHaveBeenCalledWith(
      conta.tipo,
      conta.id,
      conta.saldo,
      conta.clienteId,
      chequeEspecial,
      rendimentoMensal
    );
  });

  it('Deve chamar o método obterConta', () => {
    const id = 1;
    controller.obterConta(id);
    expect(service.obterConta).toHaveBeenCalledWith(id);
  });

  it('Deve chamar o método obterContas', () => {
    controller.obterContas();
    expect(service.obterContas).toHaveBeenCalled();
  });

  it('Deve chamar o método atualizarConta', () => {
    const id = 1;
    const tipo = TipoConta.CONTA_CORRENTE;
    controller.atualizarConta(id, tipo);
    expect(service.atualizarConta).toHaveBeenCalledWith(id, tipo);
  });

  it('Deve chamar o método removerConta', () => {
    const id = 1;
    controller.removerConta(id);
    expect(service.removerConta).toHaveBeenCalledWith(id);
  });

  it('Deve chamar o método removerContasPorCliente', () => {
    const clienteId = 1;
    controller.removerContasPorCliente(clienteId);
    expect(service.removerContasPorCliente).toHaveBeenCalledWith(clienteId);
  });

  it('Deve lidar com exceções para obter uma conta', () => {
    const id = 1;
    const errorMessage = 'Conta não encontrada';
    (service.obterConta as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    try {
      controller.obterConta(id);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });

});
