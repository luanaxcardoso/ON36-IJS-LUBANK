import { Test, TestingModule } from '@nestjs/testing';
import { TipoConta } from '../../src/domain/enums/tiposconta.enum';
import { ContaCorrenteFactory } from '../../src/domain/factories/contacorrente.factory';
import { ContaPoupancaFactory } from '../../src/domain/factories/contapoupanca.factory';
import { ContaCorrente } from '../../src/domain/models/contas/contacorrente.model';
import { ContaPoupanca } from '../../src/domain/models/contas/contapoupanca.model';
import { ContaService } from '../../src/application/services/conta.service';
import { CreateContaDto } from '../../src/application/dto/conta/create-conta.dto';
import { CreateContaCorrenteDto } from '../../src/application/dto/conta/contacorrente/create-conta-corrente.dto';
import { CreateContaPoupancaDto } from '../../src/application/dto/conta/contapoupanca/create-poupanca.dto';

jest.mock('../../src/domain/factories/contacorrente.factory');
jest.mock('../../src/domain/factories/contapoupanca.factory');

describe('ContaService', () => {
  let service: ContaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContaService],
    }).compile();

    service = module.get<ContaService>(ContaService);
  });

  it('Deve criar uma conta corrente', async () => {
    const createContaDto: CreateContaCorrenteDto = {
      tipo: TipoConta.CONTA_CORRENTE,
      id: 1,
      saldo: 1000,
      clienteId: 1,
      chequeEspecial: 500,
    };

    const contaMock = new ContaCorrente(
      createContaDto.id,
      createContaDto.saldo,
      createContaDto.clienteId,
      createContaDto.chequeEspecial
    );
    (ContaCorrenteFactory.criarContaCorrente as jest.Mock).mockReturnValue(contaMock);

    const conta = await service.criarConta(createContaDto);

    expect(conta).toBeDefined();
    expect(conta.id).toBe(createContaDto.id);
    expect(conta.saldo).toBe(createContaDto.saldo);
    expect(conta.clienteId).toBe(createContaDto.clienteId);
    expect(conta.tipo).toBe(TipoConta.CONTA_CORRENTE);
    expect((conta as ContaCorrente).chequeEspecial).toBe(createContaDto.chequeEspecial);
  });

  it('Deve criar uma conta poupança', async () => {
    const createContaDto: CreateContaPoupancaDto = {
      tipo: TipoConta.CONTA_POUPANCA,
      id: 2,
      saldo: 2000,
      clienteId: 2,
      rendimentoMensal: 1.5,
    };

    const contaMock = new ContaPoupanca(
      createContaDto.id,
      createContaDto.saldo,
      createContaDto.clienteId,
      createContaDto.rendimentoMensal
    );
    (ContaPoupancaFactory.criarContaPoupanca as jest.Mock).mockReturnValue(contaMock);

    const conta = await service.criarConta(createContaDto);

    expect(conta).toBeDefined();
    expect(conta.id).toBe(createContaDto.id);
    expect(conta.saldo).toBe(createContaDto.saldo);
    expect(conta.clienteId).toBe(createContaDto.clienteId);
    expect(conta.tipo).toBe(TipoConta.CONTA_POUPANCA);
    expect((conta as ContaPoupanca).rendimentoMensal).toBe(createContaDto.rendimentoMensal);
  });

  it('Deve lançar um erro ao tentar criar um tipo de conta não suportado', async () => {
    const createContaDto: CreateContaDto = {
      tipo: 'CONTA_INVALIDA' as TipoConta,
      id: 3,
      saldo: 200,
      clienteId: 3,
    };

    await expect(service.criarConta(createContaDto))
      .rejects
      .toThrow('Tipo de conta não suportado: CONTA_INVALIDA');
  });
});
