import { Conta } from "src/conta/conta.model";
import { InterfacePessoa } from "src/interfaces/pessoa.interface";

export class Cliente implements InterfacePessoa {
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
    public rendaSalarial: number,
    public conta: Conta[] = []
  ){}

}