"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agencia = void 0;
class Agencia {
    constructor(id, nome, endereco) {
        this.clientes = [];
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
    }
    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    getEndereco() {
        return this.endereco;
    }
    getClientes() {
        return this.clientes;
    }
    adicionarCliente(cliente) {
        this.clientes.push(cliente);
    }
    listarClientes() {
        return this.clientes;
    }
    removerCliente(clienteId) {
        const index = this.clientes.findIndex((cliente) => cliente.getId() === clienteId);
        if (index !== -1) {
            this.clientes.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.Agencia = Agencia;
