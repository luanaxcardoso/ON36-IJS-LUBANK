import { InterfacePessoa } from 'src/interfaces/pessoa.interface';
import { Cliente } from '../cliente/cliente.model';
import { Conta } from '../conta/conta.model';

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
