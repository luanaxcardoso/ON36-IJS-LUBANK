import { ICliente } from "../cliente/ICliente";

export interface IEmprestimo {
  calcularTotal(): number;
  quitarEmprestimo(): void;
  atrasarEmprestimo(): void;
  getId(): string;
  getCliente(): ICliente;
  getValor(): number;
  getTaxaJuros(): number;
  getPrazo(): number;
  getStatus(): string;
}
