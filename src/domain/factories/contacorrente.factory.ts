// src/domain/factories/contacorrente.factory.ts
import { ContaCorrente } from '../models/contas/contacorrente.model';
import { CreateContaCorrenteDto } from '../../application/dto/conta/contacorrente/create-conta-corrente.dto';
import { BadRequestException } from '@nestjs/common';

export class ContaCorrenteFactory {
  static criarContaCorrente(dto: CreateContaCorrenteDto): ContaCorrente {
    const { id, saldo, clienteId, chequeEspecial } = dto;

    
    if (chequeEspecial < 0) {
      throw new BadRequestException('Cheque especial não pode ser negativo');
    }

    
    return new ContaCorrente(id, saldo, clienteId, chequeEspecial);
  }
}
