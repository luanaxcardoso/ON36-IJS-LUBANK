"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    constructor(id, nome, cpf, dataNascimento, endereco, telefone, email, idAgencia, statusCliente = "Ativo", cnpj) {
        this.contas = [];
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
    getNome() {
        return this.nome;
    }
    getId() {
        return this.id;
    }
    getCpf() {
        return this.cpf;
    }
    getCnpj() {
        return this.cnpj;
    }
    formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    getDataNascimento() {
        return this.formatDate(this.dataNascimento);
    }
    getEndereco() {
        return this.endereco;
    }
    getTelefone() {
        return this.telefone;
    }
    getEmail() {
        return this.email;
    }
    getDataCadastro() {
        return this.formatDate(this.dataCadastro);
    }
    getStatusCliente() {
        return this.statusCliente;
    }
    getIdAgencia() {
        return this.idAgencia;
    }
    getContas() {
        return this.contas;
    }
}
exports.Cliente = Cliente;
