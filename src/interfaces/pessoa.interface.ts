import { Conta } from "src/conta/conta.model";

export interface InterfacePessoa {
    id: number;
    nome: string;
    dataNascimento: string;
    email: string;
    telefone: string;
    endereco: string;
    cidade: string;
    estado: string;
    cpf: string;
    rendaSalarial?: number;
    conta?: Conta[];
  }