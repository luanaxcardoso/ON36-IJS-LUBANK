"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
class Emprestimo {
    constructor(id, cliente, valor, taxaJuros, prazo) {
        this.id = id;
        this.cliente = cliente;
        this.valor = valor;
        this.taxaJuros = taxaJuros;
        this.prazo = prazo;
        this.status = "ativo";
    }
    calcularTotal() {
        return 0;
    }
    quitarEmprestimo() { }
    atrasarEmprestimo() { }
    getId() {
        return this.id;
    }
    getCliente() {
        return this.cliente;
    }
    getValor() {
        return this.valor;
    }
    getTaxaJuros() {
        return this.taxaJuros;
    }
    getPrazo() {
        return this.prazo;
    }
    getStatus() {
        return this.status;
    }
}
exports.Emprestimo = Emprestimo;
