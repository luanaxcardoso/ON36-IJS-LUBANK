import { ContaCorrente } from '../entities/contas/contacorrente.entity';
import { CreateContaCorrenteDto } from '../../application/dto/conta/contacorrente/create-conta-corrente.dto';
import { BadRequestException } from '@nestjs/common';

export class ContaCorrenteFactory {
  static criarContaCorrente(dto: CreateContaCorrenteDto): ContaCorrente {
    const { id, saldo, clienteId, chequeEspecial } = dto;

    if (chequeEspecial < 0) {
      throw new BadRequestException('Cheque especial não pode ser negativo');
    }

    const contaCorrente = new ContaCorrente(
      id,
      saldo,
      clienteId,
      chequeEspecial,
    );
    return contaCorrente;
  }
}
