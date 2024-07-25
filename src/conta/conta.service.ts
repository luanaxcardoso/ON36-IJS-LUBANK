import { Injectable } from '@nestjs/common';
import { Conta } from './conta.model';
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


}
