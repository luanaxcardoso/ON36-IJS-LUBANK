import { Injectable } from '@nestjs/common';
import { Cliente } from '../cliente/cliente.model';
import { Conta } from '../conta/conta.model';
import { TipoConta } from '../enums/tiposconta.enum';

@Injectable()
export class GerenteService {
  private clientes: Cliente[] = [];
  private contas: Conta[] = [];

  adicionarCliente(cliente: Cliente): Cliente {
    this.clientes.push(cliente);
    return cliente;
  }

  removerCliente(clienteId: number): boolean {
    const cliente = this.clientes.find(c => c.id === clienteId);
    if (cliente) {
      this.clientes = this.clientes.filter(c => c.id !== clienteId);
      this.contas = this.contas.filter(c => c.clienteId !== clienteId);
      return true;
    }
    return false;
  }

  abrirConta(clienteId: number, tipo: TipoConta): Conta | undefined {
    const clienteExiste = this.clientes.some(c => c.id === clienteId);
    if (clienteExiste) {
      const novaConta = new Conta(this.contas.length + 1, tipo, 0, clienteId);
      this.contas.push(novaConta);
      return novaConta;
    }
    return undefined;
  }

  fecharConta(contaId: number): boolean {
    const conta = this.contas.find(c => c.id === contaId);
    if (conta) {
      this.contas = this.contas.filter(c => c.id !== contaId);
      return true;
    }
    return false;
  }

  modificarConta(contaId: number, novoTipo: TipoConta): Conta | undefined {
    const conta = this.contas.find(c => c.id === contaId);
    if (conta) {
      conta.tipo = novoTipo;
      return conta;
    }
    return undefined;
  }

  obterClientes(): Cliente[] {
    
    return this.clientes.map(cliente => ({
      ...cliente,
      contas: this.contas.filter(conta => conta.clienteId === cliente.id),
    }));
  }

  obterContas(): Conta[] {
    return this.contas;
  }
}
