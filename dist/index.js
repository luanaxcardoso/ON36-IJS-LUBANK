"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = require("./cliente/Cliente");
const Agencia_1 = require("./agencia/Agencia");
const Emprestimo_1 = require("./servicos/Emprestimo");
const Contas_1 = require("./contas/Contas");
// Dados para teste (rodar com o comando: npm start)
const agencia = new Agencia_1.Agencia("001", "Banco do Brasil", "Av. Paulista, 1234");
const cliente = new Cliente_1.Cliente("001", "Luana", "123.456.789-00", new Date("1986-12-08"), "Rua das Carpas, 0", "1234-5678", "luana@example.com", "001");
const contaCorrente = new Contas_1.Conta(cliente, "corrente");
const contaPoupanca = new Contas_1.Conta(cliente, "poupanca");
const emprestimo = new Emprestimo_1.Emprestimo("001", cliente, 1000, 0.05, 12);
console.log(agencia);
console.log("Data de Nascimento:", cliente.getDataNascimento());
console.log("Data de Cadastro:", cliente.getDataCadastro());
console.log(contaCorrente);
console.log(contaPoupanca);
console.log(emprestimo);
