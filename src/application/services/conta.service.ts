import { Injectable, NotFoundException } from '@nestjs/common';
import { Conta } from '../../db/entities/conta.entity';
import { TipoConta } from '../../domain/enums/tiposconta.enum';
import { ContaCorrenteFactory } from '../../domain/factories/contacorrente.factory';
import { ContaPoupancaFactory } from '../../domain/factories/contapoupanca.factory';
import { CreateContaDto } from '../dto/conta/create-conta.dto';
import { UpdateContaDto } from '../dto/conta/update-conta.dto';
import { CreateContaCorrenteDto } from '../dto/conta/contacorrente/create-conta-corrente.dto';
import { CreateContaPoupancaDto } from '../dto/conta/contapoupanca/create-poupanca.dto';
import { UpdateContaCorrenteDto } from '../dto/conta/contacorrente/update-conta-corrente.dto';
import { UpdateContaPoupancaDto } from '../dto/conta/contapoupanca/update-poupanca.dto';
import { ContaCorrente } from '../../db/entities/contacorrente.entity';
import { ContaPoupanca } from '../../db/entities/contapoupanca.entity';

@Injectable()
export class ContaService {
  private contas: Conta[] = [];

  async criarConta(contaDto: CreateContaDto): Promise<Conta> {
    let conta: Conta;
    switch (contaDto.tipo) {
      case TipoConta.CONTA_CORRENTE:
        conta = ContaCorrenteFactory.criarContaCorrente(
          contaDto as unknown as CreateContaCorrenteDto,
        );
        break;
      case TipoConta.CONTA_POUPANCA:
        conta = ContaPoupancaFactory.criarContaPoupanca(
          contaDto as unknown as CreateContaPoupancaDto,
        );
        break;
      default:
        throw new Error(`Tipo de conta não suportado: ${contaDto.tipo}`);
    }
    this.contas.push(conta);
    console.log('Conta criada:', conta);
    return conta;
  }

  async obterConta(id: number): Promise<Conta | undefined> {
    return this.contas.find((conta) => conta.id === id);
  }

  async obterContas(): Promise<Conta[]> {
    return this.contas;
  }

  async atualizarConta(
    id: number,
    updateContaDto: UpdateContaDto,
  ): Promise<Conta | undefined> {
    const conta = this.contas.find((c) => c.id === id);
    if (conta) {
      if (updateContaDto.tipo) {
        conta.tipo = updateContaDto.tipo;
      }
      if ('chequeEspecial' in updateContaDto) {
        if (conta instanceof ContaCorrente) {
          conta.chequeEspecial = (
            updateContaDto as UpdateContaCorrenteDto
          ).chequeEspecial;
        }
      }
      if ('rendimentoMensal' in updateContaDto) {
        if (conta instanceof ContaPoupanca) {
          conta.rendimentoMensal = (
            updateContaDto as UpdateContaPoupancaDto
          ).rendimentoMensal;
        }
      }
      return conta;
    }
    return undefined;
  }

  async removerConta(id: number): Promise<void> {
    const contaIndex = this.contas.findIndex((conta) => conta.id === id);
    if (contaIndex === -1) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada.`);
    }
    this.contas.splice(contaIndex, 1);
  }

  async removerContasPorCliente(idCliente: number): Promise<void> {
    this.contas = this.contas.filter((conta) => conta.clienteId !== idCliente);
  }
}
