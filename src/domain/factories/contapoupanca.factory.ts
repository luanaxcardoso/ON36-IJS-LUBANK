// src/domain/factories/contapoupanca.factory.ts
import { ContaPoupanca } from '../models/contas/contapoupanca.model';
import { CreateContaPoupancaDto } from '../../application/dto/conta/contapoupanca/create-poupanca.dto';
import { BadRequestException } from '@nestjs/common';

export class ContaPoupancaFactory {
  static criarContaPoupanca(dto: CreateContaPoupancaDto): ContaPoupanca {
    const { id, saldo, clienteId, rendimentoMensal } = dto;

    if (rendimentoMensal < 0) {
      throw new BadRequestException('Rendimento mensal não pode ser negativo');
    }

    return new ContaPoupanca(id, saldo, clienteId, rendimentoMensal);
  }
}
