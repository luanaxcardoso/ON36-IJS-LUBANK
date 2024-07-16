// src/agencia/Agencia.ts
import { Cliente } from "../cliente/Cliente";

export interface IAgencia {
  getId(): string;
  getNome(): string;
  getEndereco(): string;
  getClientes(): Cliente[];
  adicionarCliente(cliente: Cliente): void;
  listarClientes(): Cliente[];
  removerCliente(clienteId: string): boolean;
}

export class Agencia implements IAgencia {
  protected id: string; 
  protected nome: string;
  protected endereco: string;
  protected clientes: Cliente[] = [];

  constructor(id: string, nome: string, endereco: string) {
    this.id = id;
    this.nome = nome;
    this.endereco = endereco;
  }

  getId(): string {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getEndereco(): string {
    return this.endereco;
  }

  getClientes(): Cliente[] {
    return this.clientes;
  }

  adicionarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
  }

  listarClientes(): Cliente[] {
    return this.clientes;
  }

  removerCliente(clienteId: string): boolean {
    const index = this.clientes.findIndex(
      (cliente) => cliente.getId() === clienteId 
    );
    if (index !== -1) {
      this.clientes.splice(index, 1);
      return true;
    }
    return false;
  }
}
