import { Test, TestingModule } from "@nestjs/testing";
import { TipoConta } from "../src/enums/tiposconta.enum";
import { ContaCorrenteFactory } from "../src/factories/contacorrente.factory";
import { ContaPoupancaFactory } from "../src/factories/contapoupanca.factory";
import { ContaCorrente } from "../src/models/contas/contacorrente.model";
import { ContaPoupanca } from "../src/models/contas/contapoupanca.model";
import { ContaService } from "../src/services/conta.service";


jest.mock('../src/factories/contacorrente.factory');
jest.mock('../src/factories/contapoupanca.factory');

describe('ContaService', () => {
  let service: ContaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContaService],
    }).compile();

    service = module.get<ContaService>(ContaService);
  });

  it('Deve criar uma conta corrente', () => {
    const id = 1;
    const saldo = 1000;
    const clienteId = 1;
    const chequeEspecial = 500;

    const contaMock = new ContaCorrente(id, saldo, clienteId, chequeEspecial);
    (ContaCorrenteFactory.criarContaCorrente as jest.Mock).mockReturnValue(contaMock);

    const conta = service.criarConta(TipoConta.CONTA_CORRENTE, id, saldo, clienteId, chequeEspecial);

    expect(conta).toBeDefined();
    expect(conta.id).toBe(id);
    expect(conta.saldo).toBe(saldo);
    expect(conta.clienteId).toBe(clienteId);
    expect(conta.tipo).toBe(TipoConta.CONTA_CORRENTE);
    expect((conta as ContaCorrente).chequeEspecial).toBe(chequeEspecial);
  });

  it('Deve criar uma conta poupança', () => {
    const id = 2;
    const saldo = 2000;
    const clienteId = 2;
    const rendimentoMensal = 1.5;

    const contaMock = new ContaPoupanca(id, saldo, clienteId, rendimentoMensal);
    (ContaPoupancaFactory.criarContaPoupanca as jest.Mock).mockReturnValue(contaMock);

    const conta = service.criarConta(TipoConta.CONTA_POUPANCA, id, saldo, clienteId, undefined, rendimentoMensal);

    expect(conta).toBeDefined();
    expect(conta.id).toBe(id);
    expect(conta.saldo).toBe(saldo);
    expect(conta.clienteId).toBe(clienteId);
    expect(conta.tipo).toBe(TipoConta.CONTA_POUPANCA);
    expect((conta as ContaPoupanca).rendimentoMensal).toBe(rendimentoMensal);
  });

  it('Deve lançar um erro ao tentar criar um tipo de conta não suportado', () => {
    const id = 3;
    const saldo = 200;
    const clienteId = 3;
  
    expect(() => {
      service.criarConta('CONTA_INVALIDA' as TipoConta, id, saldo, clienteId);
    }).toThrow('Tipo de conta não suportado: CONTA_INVALIDA');
  });
  
});