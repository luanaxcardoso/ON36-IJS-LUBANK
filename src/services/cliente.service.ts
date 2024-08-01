import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InterfacePessoa } from '../interfaces/pessoa.interface';
import { ContaService } from '../services/conta.service';


@Injectable()
export class ClienteService {
  private clientes: InterfacePessoa[] = []; 

  constructor(private readonly contaService: ContaService) {}

  adicionarCliente(cliente: InterfacePessoa): InterfacePessoa { 
    this.clientes.push(cliente);
    return cliente;
  }
  

  verificarCreditoComunitario(clienteId: number): { message: string } {
    const cliente = this.clientes.find(c => c.id === clienteId);
    if (!cliente) {
      throw new NotFoundException(`Cliente não encontrado.`);
    }
    if (cliente.rendaSalarial < 4000) {
      return { message: 'Cliente é elegível para crédito comunitário.' };
    } else {
      return { message: 'Cliente não é elegível para crédito comunitário.' };
    }
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
