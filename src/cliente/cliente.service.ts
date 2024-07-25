import { Injectable } from '@nestjs/common';
import { InterfacePessoa } from '../interfaces/pessoa.interface'; 
import { ContaService } from '../conta/conta.service';  // Certifique-se de importar o ContaService
import { TipoConta } from '../enums/tiposconta.enum';
import { Conta } from '../conta/conta.model';

@Injectable()
export class ClienteService {
  private clientes: InterfacePessoa[] = []; 

  constructor(private readonly contaService: ContaService) {}

  adicionarCliente(cliente: InterfacePessoa): InterfacePessoa { 
    this.clientes.push(cliente);
    return cliente;
  }
  

  verificarCreditoComunitario(clienteId: number): InterfacePessoa | undefined {
    const cliente = this.clientes.find(c => c.id === clienteId);
    if (cliente && cliente.rendaSalarial && cliente.rendaSalarial < 4000) {
      const novaConta = new Conta(
        this.contaService.obterContas().length + 1, 
        TipoConta.CREDITO_COMUNITARIO, 
        0, 
        cliente.id
      );
      this.contaService.criarConta(novaConta);

      if (!cliente.conta) {
        cliente.conta = [];
      }
      cliente.conta.push(novaConta);
    }
    return cliente;
  }

  obterCliente(id: number): InterfacePessoa | undefined { 
    return this.clientes.find(cliente => cliente.id === id);
  }

  obterClientes(): InterfacePessoa[] { 
    return this.clientes;
  }

  atualizarCliente(id: number, clienteAtualizado: Partial<InterfacePessoa>): InterfacePessoa | undefined {
    const cliente = this.clientes.find(c => c.id === id);
    if (cliente) {
      Object.assign(cliente, clienteAtualizado);
      return cliente;
    }
    return undefined;
  }
  
  removerCliente(id: number): boolean {
    const clienteExistente = this.clientes.some(cliente => cliente.id === id);
    if (clienteExistente) {
      this.clientes = this.clientes.filter(cliente => cliente.id !== id);
      
      this.contaService.removerContasPorCliente(id);
      return true;
    }
    return false;
  }

  associarConta(clienteId: number, contaId: number): boolean {
    const cliente = this.clientes.find(c => c.id === clienteId);
    const conta = this.contaService.obterConta(contaId);
    if (cliente && conta) {
      if (!cliente.conta) {
        cliente.conta = [];
      }
      cliente.conta.push(conta);
      return true;
    }
    return false;
  }
}
