import { ContaCorrente } from '../../domain/models/contas/contacorrente.model';
import { BadRequestException } from '@nestjs/common';

export class ContaCorrenteFactory {
  static criarContaCorrente(
    id: number,
    saldo: number,
    clienteId: number,
    chequeEspecial: number,
  ): ContaCorrente {
    if (chequeEspecial < 0) {
      throw new BadRequestException('Cheque especial não pode ser negativo');
    }
    return new ContaCorrente(id, saldo, clienteId, chequeEspecial);
  }
}
