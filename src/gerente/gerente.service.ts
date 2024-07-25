import { Injectable, NotFoundException } from '@nestjs/common';
import { Cliente } from '../cliente/cliente.model';
import { Conta } from '../conta/conta.model';
import { TipoConta } from '../enums/tiposconta.enum';
import { InterfacePessoa } from 'src/interfaces/pessoa.interface';
import { ContaService } from 'src/conta/conta.service';

@Injectable()
export class GerenteService {
  private clientes: InterfacePessoa[] = [];
  private contas: Conta[] = [];

  constructor(private readonly contaService: ContaService) {}

  adicionarCliente(cliente: InterfacePessoa): InterfacePessoa {
    this.clientes.push(cliente);
    return cliente;
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
    const contaIndex = this.contas.findIndex(c => c.id === contaId);
    if (contaIndex === -1) {
      return false;
    }
    this.contas.splice(contaIndex, 1);
    return true;
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
    })) as Cliente[];
  }

  obterContas(): Conta[] {
    return this.contas;
  }

  removerCliente(id: number): { message: string; statusCode: number } {
    console.log('Clientes:', this.clientes);
    console.log('ID recebido para remoção:', id);
  
    const clienteExistente = this.clientes.some(cliente => cliente.id === id);
    if (clienteExistente) {
      this.clientes = this.clientes.filter(cliente => cliente.id !== id);
      this.contaService.removerContasPorCliente(id);
      console.log('Clientes após a remoção:', this.clientes);
      return { message: `Cliente ${id} removido com sucesso.`, statusCode: 200 };
    }
    return { message: `Cliente ${id} não encontrado.`, statusCode: 404 };
  }


}
