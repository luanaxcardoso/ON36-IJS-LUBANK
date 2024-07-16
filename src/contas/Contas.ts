import { Cliente } from "../cliente/Cliente";

export interface IConta {
  getSaldo(): number;
  depositar(valor: number): void;
  sacar(valor: number): boolean;
  transferir(contaDestino: IConta, valor: number): boolean;
}

export class Conta implements IConta {
  private readonly id: string;
  private readonly tipo: string;
  protected saldo: number = 0;
  private readonly cliente: Cliente;

  constructor(cliente: Cliente, tipo: string) {
    this.cliente = cliente;
    this.tipo = tipo;
    this.id = `${tipo}-${Math.random().toString(36).substring(2, 15)}`;
  }

  getSaldo(): number {
    return this.saldo;
  }

  depositar(valor: number): void {}

  sacar(valor: number): boolean {
    return true;
  }

  transferir(contaDestino: IConta, valor: number): boolean {
    return true;
  }
}

export class ContaCorrente extends Conta {
  private limiteChequeEspecial: number;

  constructor(cliente: Cliente, limiteChequeEspecial: number) {
    super(cliente, "corrente");
    this.limiteChequeEspecial = limiteChequeEspecial;
  }

  sacar(valor: number): boolean {
    return true;
  }
}

export class ContaPoupanca extends Conta {
  private taxaJuros: number;

  constructor(cliente: Cliente, taxaJuros: number) {
    super(cliente, "poupanca");
    this.taxaJuros = taxaJuros;
  }

  getTaxaJuros(): number {
    return this.taxaJuros;
  }
}
