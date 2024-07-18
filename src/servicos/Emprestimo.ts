import { ICliente } from "../cliente/ICliente";
import { IEmprestimo } from "./IEmprestimo";

export class Emprestimo implements IEmprestimo {
  private id: string;
  private cliente: ICliente;
  private valor: number;
  private taxaJuros: number; 
  private prazo: number;     
  private status: string;    

  constructor(
    id: string,
    cliente: ICliente,
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
   
    const juros = this.valor * (this.taxaJuros / 100) * (this.prazo / 12); 
    return this.valor + juros;
  }

  quitarEmprestimo(): void {
    if (this.status === "ativo") {
      this.status = "quitado";
    } else {
      throw new Error("Empréstimo não está ativo ou já foi quitado.");
    }
  }

  atrasarEmprestimo(): void {
    if (this.status === "ativo") {
      this.status = "atrasado";
    } else {
      throw new Error("Empréstimo não está ativo ou já foi quitado.");
    }
  }

  public getId(): string {
    return this.id;
  }

  public getCliente(): ICliente {
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
