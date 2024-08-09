import { ContaPoupanca } from '../models/contas/contapoupanca.model';
import { BadRequestException } from '@nestjs/common';

export class ContaPoupancaFactory {
  static criarContaPoupanca(
    id: number,
    saldo: number,
    clienteId: number,
    rendimentoMensal: number
  ): ContaPoupanca {
    if (rendimentoMensal < 0) {
      throw new BadRequestException('Rendimento mensal não pode ser negativo');
    }
    return new ContaPoupanca(id, saldo, clienteId, rendimentoMensal);
  }
}

