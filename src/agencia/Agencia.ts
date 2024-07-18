import { ICliente } from "../cliente/ICliente";
import { IAgencia } from "./IAgencia";

export class Agencia implements IAgencia {
  protected id: string;
  protected nome: string;
  protected endereco: string;
  protected clientes: ICliente[] = [];

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

  getClientes(): ICliente[] {
    return this.clientes;
  }

  adicionarCliente(cliente: ICliente): void {
    this.clientes.push(cliente);
  }

  listarClientes(): ICliente[] {
    return this.clientes;
  }

  removerCliente(clienteId: string): boolean {
    const index = this.clientes.findIndex(cliente => cliente.getId() === clienteId);
    if (index !== -1) {
      this.clientes.splice(index, 1);
      return true;
    }
    return false;
  }

  buscarClientePorId(clienteId: string): ICliente | null {
    const cliente = this.clientes.find(cliente => cliente.getId() === clienteId);
    return cliente || null;
  }

  atualizarCliente(clienteAtualizado: ICliente): boolean {
    const index = this.clientes.findIndex(cliente => cliente.getId() === clienteAtualizado.getId());
    if (index !== -1) {
      this.clientes[index] = clienteAtualizado;
      return true;
    }
    return false;
  }
}
