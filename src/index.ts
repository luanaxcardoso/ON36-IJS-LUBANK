import { Cliente } from "./cliente/Cliente";
import { Agencia } from "./agencia/Agencia";
import { Emprestimo } from "./servicos/Emprestimo";
import { ContaCorrente, ContaPoupanca } from "./contas/Contas";

const agencia = new Agencia("037", "LUBANK", "Av. Brasil, 1234");

const cliente = new Cliente(
  "001",
  "Luana",
  "123.456.789-00",
  new Date("1986-12-08"),
  "Rua das Carpas, 2012",
  "1234-5678",
  "luana@gmail.com",
  "001"
);

const contaCorrente = new ContaCorrente(cliente, 1000, 500); 
const contaPoupanca = new ContaPoupanca(cliente, 0.02, 500); 
const emprestimo = new Emprestimo("001", cliente, 1000, 0.05, 12);

cliente.adicionarConta(contaCorrente);
cliente.adicionarConta(contaPoupanca);
agencia.adicionarCliente(cliente);

console.log("=== Dados da Agência ===");
console.log("ID da Agência:", agencia.getId());
console.log("Nome da Agência:", agencia.getNome());
console.log("Endereço da Agência:", agencia.getEndereco());

console.log("\n=== Dados do Cliente ===");
console.log("Nome do Cliente:", cliente.getNome());
console.log("Data de Nascimento:", cliente.getDataNascimento());
console.log("Data de Cadastro:", cliente.getDataCadastro());

console.log("\n=== Contas do Cliente ===");
console.log("Conta Corrente ID:", contaCorrente.getId());
console.log("Saldo Conta Corrente:", contaCorrente.getSaldo());
console.log("Crédito Comunitário da Conta Corrente:", contaCorrente["creditoComunitario"]);

console.log("Conta Poupança ID:", contaPoupanca.getId());
console.log("Saldo Conta Poupança:", contaPoupanca.getSaldo());
console.log("Taxa de Juros da Conta Poupança:", contaPoupanca.getTaxaJuros());

console.log("\n=== Empréstimo ===");
console.log("ID do Empréstimo:", emprestimo.getId());
console.log("Valor do Empréstimo:", emprestimo.getValor());
console.log("Taxa de Juros do Empréstimo:", emprestimo.getTaxaJuros());
console.log("Prazo do Empréstimo:", emprestimo.getPrazo());
console.log("Status do Empréstimo:", emprestimo.getStatus());

console.log("\n=== Operações com Contas ===");
console.log("Depositando R$ 200 na Conta Corrente...");
contaCorrente.depositar(200);
console.log("Saldo Atual da Conta Corrente:", contaCorrente.getSaldo());

console.log("Sacando R$ 100 da Conta Corrente...");
const sucessoSaque = contaCorrente.sacar(100);
console.log("Saque bem-sucedido?", sucessoSaque);
console.log("Saldo Atual da Conta Corrente:", contaCorrente.getSaldo());

console.log("Transferindo R$ 50 da Conta Corrente para Conta Poupança...");
const sucessoTransferencia = contaCorrente.transferir(contaPoupanca, 50);
console.log("Transferência bem-sucedida?", sucessoTransferencia);
console.log("Saldo Atual da Conta Corrente:", contaCorrente.getSaldo());
console.log("Saldo Atual da Conta Poupança:", contaPoupanca.getSaldo());

console.log("\n=== Operações com Empréstimo ===");
console.log("Calculando Total do Empréstimo...");
const total = emprestimo.calcularTotal();
console.log("Total a ser pago no Empréstimo:", total);

try {
  console.log("Atrasando Empréstimo...");
  emprestimo.atrasarEmprestimo();  
} catch (error) {
  if (error instanceof Error) {
    console.error("Erro:", error.message);
  } else {
    console.error("Erro desconhecido:", error);
  }
}

console.log("\n=== Saldo Final das Contas ===");
console.log("Saldo Final da Conta Corrente:", contaCorrente.getSaldo());
console.log("Saldo Final da Conta Poupança:", contaPoupanca.getSaldo());

console.log("\n");

console.log("Obrigado por escolher o LUBANK! Seu parceiro na inclusão financeira e desenvolvimento local.");

console.log("\n---------------------------------------------------------------------------------------------");
