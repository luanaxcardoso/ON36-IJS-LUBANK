import { Injectable } from '@nestjs/common';
import { Conta } from '../models/contas/conta.model';
import { ContaCorrente } from '../models/contas/contacorrente.model';
import { ContaPoupanca } from '../models/contas/contapoupanca.model';
import { TipoConta } from 'src/enums/tiposconta.enum';

@Injectable()
export class ContaService {
  private contas: Conta[] = [];

  criarConta(conta: Conta): Conta {
    this.contas.push(conta);
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

  removerContasPorCliente(idCliente: number): void {
    this.contas = this.contas.filter(conta => conta.clienteId !== idCliente);
  }

  criarContaCorrente(id: number, saldo: number, clienteId: number): ContaCorrente {
    const novaConta = new ContaCorrente(id, saldo, clienteId);
    return this.criarConta(novaConta) as ContaCorrente;
  }

  criarContaPoupanca(id: number, saldo: number, clienteId: number, rendimento: number): ContaPoupanca {
    const novaConta = new ContaPoupanca(id, saldo, clienteId, rendimento);
    return this.criarConta(novaConta) as ContaPoupanca;
  }
}
