import { IConta } from "../contas/Contas";

export interface ICliente {
  getId(): string;
  getNome(): string;
  getCpf(): string;
  getCnpj(): string | undefined;
  getDataNascimento(): string; 
  getEndereco(): string;
  getTelefone(): string;
  getEmail(): string;
  getDataCadastro(): string; 
  getStatusCliente(): string;
  getIdAgencia(): string;
  getContas(): IConta[];
}

export class Cliente implements ICliente {
  protected id: string;
  protected nome: string;
  protected cpf: string;
  protected cnpj?: string;
  protected dataNascimento: Date;
  protected endereco: string;
  protected telefone: string;
  protected email: string;
  protected dataCadastro: Date;
  protected statusCliente: string;
  protected idAgencia: string;
  protected contas: IConta[] = [];

  constructor(
    id: string,
    nome: string,
    cpf: string,
    dataNascimento: Date,
    endereco: string,
    telefone: string,
    email: string,
    idAgencia: string,
    statusCliente: string = "Ativo",
    cnpj?: string
  ) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
    this.endereco = endereco;
    this.telefone = telefone;
    this.email = email;
    this.dataCadastro = new Date();
    this.idAgencia = idAgencia;
    this.statusCliente = statusCliente;
    this.cnpj = cnpj;
  }

  getNome(): string {
    return this.nome;
  }

  getId(): string {
    return this.id;
  }

  getCpf(): string {
    return this.cpf;
  }

  getCnpj(): string | undefined {
    return this.cnpj;
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getDataNascimento(): string {
    return this.formatDate(this.dataNascimento);
  }

  getEndereco(): string {
    return this.endereco;
  }

  getTelefone(): string {
    return this.telefone;
  }

  getEmail(): string {
    return this.email;
  }

  getDataCadastro(): string {
    return this.formatDate(this.dataCadastro);
  }

  getStatusCliente(): string {
    return this.statusCliente;
  }

  getIdAgencia(): string {
    return this.idAgencia;
  }

  getContas(): IConta[] {
    return this.contas;
  }
}
