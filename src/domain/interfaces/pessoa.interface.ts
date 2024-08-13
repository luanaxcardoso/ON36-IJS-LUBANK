import { Conta } from '../../domain/models/contas/conta.model';

export interface InterfacePessoa {
  id: number;
  nome: string;
  dataNascimento: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  cpf: string;
  rendaSalarial?: number;
  statusAtivo?: boolean;
  conta?: Conta[];
}