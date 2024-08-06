import { ContaCorrente } from '../src/models/contas/contacorrente.model';
import { ContaCorrenteFactory } from '../src/factories/contacorrente.factory';
import { BadRequestException } from '@nestjs/common';

describe('ContaCorrenteFactory', () => {
  it('deve criar uma instância de ContaCorrente com os parâmetros corretos', () => {
    const id = 1;
    const saldo = 1000;
    const clienteId = 2;
    const chequeEspecial = 500;

    const contaCorrente = ContaCorrenteFactory.criarContaCorrente(id, saldo, clienteId, chequeEspecial);

    expect(contaCorrente).toBeInstanceOf(ContaCorrente);
    expect(contaCorrente.id).toBe(id);
    expect(contaCorrente.saldo).toBe(saldo);
    expect(contaCorrente.clienteId).toBe(clienteId);
    expect(contaCorrente.chequeEspecial).toBe(chequeEspecial);
  });

  it('deve lançar uma exceção se o cheque especial for negativo', () => {
    const id = 1;
    const saldo = 1000;
    const clienteId = 2;
    const chequeEspecial = -500; 

    expect(() => {
      ContaCorrenteFactory.criarContaCorrente(id, saldo, clienteId, chequeEspecial);
    }).toThrow(new BadRequestException('Cheque especial não pode ser negativo'));
  });
});
