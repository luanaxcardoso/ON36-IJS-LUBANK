import { ContaPoupanca } from '../src/models/contas/contapoupanca.model';
import { ContaPoupancaFactory } from '../src/factories/contapoupanca.factory';
import { BadRequestException } from '@nestjs/common';

describe('ContaPoupancaFactory', () => {
  it('deve criar uma instância de ContaPoupanca com os parâmetros corretos', () => {
    const id = 1;
    const saldo = 1000;
    const clienteId = 2;
    const rendimentoMensal = 30;

    const contaPoupanca = ContaPoupancaFactory.criarContaPoupanca(id, saldo, clienteId, rendimentoMensal);

    expect(contaPoupanca).toBeInstanceOf(ContaPoupanca);
    expect(contaPoupanca.id).toBe(id);
    expect(contaPoupanca.saldo).toBe(saldo);
    expect(contaPoupanca.clienteId).toBe(clienteId);
    expect(contaPoupanca.rendimentoMensal).toBe(rendimentoMensal);
  });

  it('deve lançar uma exceção se o rendimento mensal for negativo', () => {
    const id = 1;
    const saldo = 1000;
    const clienteId = 2;
    const rendimentoMensal = -30; 

    expect(() => {
      ContaPoupancaFactory.criarContaPoupanca(id, saldo, clienteId, rendimentoMensal);
    }).toThrow(new BadRequestException('Rendimento mensal não pode ser negativo'));
  });
});
