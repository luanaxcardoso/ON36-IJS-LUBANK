import { Injectable } from '@nestjs/common';
import { Conta } from '../models/contas/conta.model';
import { TipoConta } from '../enums/tiposconta.enum';
import { ContaCorrenteFactory } from '../factories/contacorrente.factory';
import { ContaPoupancaFactory } from '../factories/contapoupanca.factory';


@Injectable()
export class ContaService {
  private contas: Conta[] = [];

  criarConta(
    tipo: TipoConta,
    id: number,
    saldo: number,
    clienteId: number,
    chequeEspecial?: number,
    rendimentoMensal?: number,
  ): Conta {
    let conta: Conta;
    switch (tipo) {
      case TipoConta.CONTA_CORRENTE:
        conta = ContaCorrenteFactory.criarContaCorrente(id, saldo, clienteId, chequeEspecial || 0);
        break;
      case TipoConta.CONTA_POUPANCA:
        conta = ContaPoupancaFactory.criarContaPoupanca(id, saldo, clienteId, rendimentoMensal || 0);
        break;
      default:
        throw new Error(`Tipo de conta não suportado: ${tipo}`);
    }
    this.contas.push(conta);
    console.log('Conta criada:', conta);
    return conta;
  }

  obterConta(id: number): Conta | undefined {
    return this.contas.find(conta => conta.id === id);
  }

  obterContas(): Conta[] {
    return this.contas;
  }

  atualizarConta(id: number, tipo: TipoConta): Conta | undefined {
    const conta = this.contas.find(c => c.id === id);
    if (conta) {
      conta.tipo = tipo;
      return conta;
    }
    return undefined;
  }

  removerConta(id: number): void {
    this.contas = this.contas.filter(conta => conta.id !== id);
  }

  removerContasPorCliente(idCliente: number): void {
    this.contas = this.contas.filter(conta => conta.clienteId !== idCliente);
  }
}