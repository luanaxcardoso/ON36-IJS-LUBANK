import { ContaCorrente } from '../models/contas/contacorrente.model';

export class ContaCorrenteFactory {
  static criarContaCorrente(
    id: number,
    saldo: number,
    clienteId: number,
    limiteBancoComunitario: number
  ): ContaCorrente {
    return new ContaCorrente(id, saldo, clienteId, limiteBancoComunitario);
  }
}
