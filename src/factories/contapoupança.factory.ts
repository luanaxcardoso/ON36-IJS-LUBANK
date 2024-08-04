import { ContaPoupanca } from '../models/contas/contapoupanca.model';

export class ContaPoupancaFactory {
  static criarContaPoupanca(
    id: number,
    saldo: number,
    clienteId: number,
    rendimentoMensal: number
  ): ContaPoupanca {
    return new ContaPoupanca(id, saldo, clienteId, rendimentoMensal);
  }
}
