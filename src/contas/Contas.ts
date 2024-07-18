// src/contas/Conta.ts
import { ICliente } from "../cliente/ICliente";
import { IContas } from "./IContas";

export class Conta implements IContas {
  protected readonly id: string;
  protected readonly tipo: string;
  protected saldo: number;
  protected readonly cliente: ICliente;

  constructor(cliente: ICliente, tipo: string, saldoInicial: number = 0) {
    this.cliente = cliente;
    this.tipo = tipo;
    this.id = `${tipo}-${Math.random().toString(36).substring(2, 15)}`;
    this.saldo = saldoInicial;
  }

  getId(): string {
    return this.id;
  }

  getTipo(): string {
    return this.tipo;
  }

  getSaldo(): number {
    return this.saldo;
  }

  depositar(valor: number): void {
    if (valor > 0) {
      this.saldo += valor;
    } else {
      throw new Error("O valor de depósito deve ser positivo.");
    }
  }

  sacar(valor: number): boolean {
    if (valor > 0 && valor <= this.saldo) {
      this.saldo -= valor;
      return true;
    }
    return false;
  }

  transferir(contaDestino: IContas, valor: number): boolean {
    if (this.sacar(valor)) {
      contaDestino.depositar(valor);
      return true;
    }
    return false;
  }
}

export class ContaCorrente extends Conta {
  protected creditoComunitario: number;

  constructor(cliente: ICliente, creditoComunitario: number, saldoInicial: number = 0) {
    super(cliente, "corrente", saldoInicial);
    this.creditoComunitario = creditoComunitario;
  }

  sacar(valor: number): boolean {
    if (valor > 0 && valor <= (this.saldo + this.creditoComunitario)) {
      this.saldo -= valor;
      return true;
    }
    return false;
  }
}

export class ContaPoupanca extends Conta {
  private taxaJuros: number;

  constructor(cliente: ICliente, taxaJuros: number, saldoInicial: number = 0) {
    super(cliente, "poupanca", saldoInicial);
    this.taxaJuros = taxaJuros;
  }

  getTaxaJuros(): number {
    return this.taxaJuros;
  }
}
