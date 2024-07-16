"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContaPoupanca = exports.ContaCorrente = exports.Conta = void 0;
class Conta {
    constructor(cliente, tipo) {
        this.saldo = 0;
        this.cliente = cliente;
        this.tipo = tipo;
        this.id = `${tipo}-${Math.random().toString(36).substring(2, 15)}`;
    }
    getSaldo() {
        return this.saldo;
    }
    depositar(valor) { }
    sacar(valor) {
        return true;
    }
    transferir(contaDestino, valor) {
        return true;
    }
}
exports.Conta = Conta;
class ContaCorrente extends Conta {
    constructor(cliente, limiteChequeEspecial) {
        super(cliente, "corrente");
        this.limiteChequeEspecial = limiteChequeEspecial;
    }
    sacar(valor) {
        return true;
    }
}
exports.ContaCorrente = ContaCorrente;
class ContaPoupanca extends Conta {
    constructor(cliente, taxaJuros) {
        super(cliente, "poupanca");
        this.taxaJuros = taxaJuros;
    }
    getTaxaJuros() {
        return this.taxaJuros;
    }
}
exports.ContaPoupanca = ContaPoupanca;
