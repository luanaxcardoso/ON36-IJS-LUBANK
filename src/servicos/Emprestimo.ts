import { Cliente } from "../cliente/Cliente";

export interface IEmprestimo {
  calcularTotal(): number;
  quitarEmprestimo(): void;
  atrasarEmprestimo(): void;
}

export class Emprestimo implements IEmprestimo {
  private id: string;
  private cliente: Cliente;
  private valor: number;
  private taxaJuros: number;
  private prazo: number;
  private status: string;

  constructor(
    id: string,
    cliente: Cliente,
    valor: number,
    taxaJuros: number,
    prazo: number
  ) {
    this.id = id;
    this.cliente = cliente;
    this.valor = valor;
    this.taxaJuros = taxaJuros;
    this.prazo = prazo;
    this.status = "ativo";
  }

  calcularTotal(): number {
    return 0; 
  }

  quitarEmprestimo(): void {}

  atrasarEmprestimo(): void {}

  public getId(): string {
    return this.id;
  }

  public getCliente(): Cliente {
    return this.cliente;
  }

  public getValor(): number {
    return this.valor;
  }

  public getTaxaJuros(): number {
    return this.taxaJuros;
  }

  public getPrazo(): number {
    return this.prazo;
  }

  public getStatus(): string {
    return this.status;
  }
}
