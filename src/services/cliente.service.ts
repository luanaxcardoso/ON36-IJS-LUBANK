import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InterfacePessoa } from '../interfaces/pessoa.interface';
import { ContaService } from '../services/conta.service';

@Injectable()
export class ClienteService {
  private clientes: InterfacePessoa[] = []; 

  constructor(private readonly contaService: ContaService) {}

  adicionarCliente(cliente: InterfacePessoa): InterfacePessoa {
    const clienteExistente = this.clientes.find(c => c.id === cliente.id);
    if (clienteExistente) {
      throw new ConflictException(`Cliente com ID ${cliente.id} já existe.`);
    }
  
    cliente.id = this.clientes.length > 0 ? this.clientes[this.clientes.length - 1].id + 1 : 1;
    this.clientes.push(cliente);
    return cliente;
  }

  buscarCliente(id: number): InterfacePessoa | undefined {
    const cliente = this.clientes.find(cliente => cliente.id === id);
    if (cliente) {
      console.log(`Cliente encontrado: ${cliente.nome}`); 
    } else {
      console.log(`Cliente não encontrado.`);
    }
    return cliente;
  }

  buscarClientes(): InterfacePessoa[] {
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

  
  deletarCliente(id: number): { message: string } {
    console.log('Deletando cliente com id:', id);
    const cliente = this.clientes.find(g => g.id === id);
    if (!cliente) {
      console.log('Cliente não encontrado.');
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    this.clientes = this.clientes.filter(g => g.id !== id);
    console.log('Cliente deletado com sucesso.');
    return { message: `Cliente com ID ${id} removido com sucesso.` };
  }

  associarConta(clienteId: number, contaId: number): boolean {
    const cliente = this.clientes.find(c => c.id === clienteId);
    const conta = this.contaService.obterConta(contaId);
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${clienteId} não encontrado.`);
    }
    if (!conta) {
      throw new NotFoundException(`Conta com ID ${contaId} não encontrada.`);
    }
    if (!cliente.conta) {
      cliente.conta = [];
    }
    cliente.conta.push(conta);
    return true;
  }
}