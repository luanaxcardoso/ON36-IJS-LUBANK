import { ContaCorrente } from '../models/contas/contacorrente.model';

export class ContaCorrenteFactory {
    static criarContaCorrente(
      id: number,
      saldo: number,
      clienteId: number,
      creditoComunitario: number
    ): ContaCorrente {
      return new ContaCorrente(id, saldo, clienteId, creditoComunitario);
    }
}
