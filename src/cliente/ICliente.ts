import { IContas } from '../contas/IContas';

export interface ICliente {
  getNome(): string;
  getId(): string;
  getCpf(): string;
  getCnpj(): string | undefined;
  getDataNascimento(): string;
  getEndereco(): string;
  getTelefone(): string;
  getEmail(): string;
  getDataCadastro(): string;
  getStatusCliente(): string;
  getIdAgencia(): string;
  getContas(): IContas[];
  adicionarConta(conta: IContas): void;
  removerConta(idConta: string): void;
  atualizarNome(nome: string): void;
  atualizarEndereco(endereco: string): void;
  atualizarTelefone(telefone: string): void;
  atualizarEmail(email: string): void;
  desativarCliente(): void;
}
