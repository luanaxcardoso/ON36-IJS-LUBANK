import { InterfacePessoa } from '../../domain/interfaces/pessoa.interface';
import { Cliente } from './cliente.model';
import { Conta } from './contas/conta.model';

export class Gerente implements InterfacePessoa {
  clientes: Cliente[] = [];
  contas: Conta[] = [];

  constructor(
    public id: number,
    public nome: string,
    public dataNascimento: string,
    public email: string,
    public telefone: string,
    public endereco: string,
    public cidade: string,
    public estado: string,
    public cep: string,
    public cpf: string,
    public rendaSalarial?: number,
    public statusAtivo: boolean = true,
  ) {}

  adicionarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
  }
}
