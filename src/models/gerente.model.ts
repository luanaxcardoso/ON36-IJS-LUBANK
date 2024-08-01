import { InterfacePessoa } from '../interfaces/pessoa.interface';
import { Cliente } from '../models/cliente.model';
import { Conta } from '../models/contas/conta.model';

export class Gerente implements InterfacePessoa {
  constructor(
    public id: number,
    public nome: string,
    public dataNascimento: string,
    public email: string,
    public telefone: string,
    public endereco: string,
    public cidade: string,
    public estado: string,
    public cpf: string,
    public rendaSalarial?: number,  
    public clientes?: Cliente[],
    public conta?: Conta[]  
  ) {}
  
}
