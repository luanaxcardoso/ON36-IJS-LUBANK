import { CreditoComunitario } from '../models/contas/creditocomunitario.model';

export class CreditoComunitarioFactory {
  static criarCreditoComunitario(
    id: number,
    saldo: number,
    clienteId: number,
    limiteCredito: number
  ): CreditoComunitario {
    return new CreditoComunitario(id, saldo, clienteId, limiteCredito);
  }
}
