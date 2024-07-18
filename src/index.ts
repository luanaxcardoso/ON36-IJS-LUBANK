import { Cliente } from "./cliente/Cliente";
import { Agencia } from "./agencia/Agencia";
import { Emprestimo } from "./servicos/Emprestimo";
import { Conta } from "./contas/Contas";

// Dados para teste (rodar com o comando: npm start)

const agencia = new Agencia("001", "Banco do Brasil", "Av. Paulista, 1234");

const cliente = new Cliente(
  "001",
  "Luana",
  "123.456.789-00",
  new Date("1986-12-08"),
  "Rua das Carpas, 0",
  "1234-5678",
  "luana@example.com",
  "001"
);

const contaCorrente = new Conta(cliente, "corrente");
const contaPoupanca = new Conta(cliente, "poupanca");
const emprestimo = new Emprestimo("001", cliente, 1000, 0.05, 12);

console.log(agencia);
console.log("Data de Nascimento:", cliente.getDataNascimento()); 
console.log("Data de Cadastro:", cliente.getDataCadastro()); 
console.log(contaCorrente);
console.log(contaPoupanca);
console.log(emprestimo);
