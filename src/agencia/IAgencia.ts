import { ICliente } from "../cliente/ICliente";

export interface IAgencia {
  getId(): string;
  getNome(): string;
  getEndereco(): string;
  getClientes(): ICliente[];
  adicionarCliente(cliente: ICliente): void;
  listarClientes(): ICliente[];
  removerCliente(clienteId: string): boolean;
  buscarClientePorId(clienteId: string): ICliente | null;
  atualizarCliente(clienteAtualizado: ICliente): boolean;
}

