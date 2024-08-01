// src/factories/credito-comunitario.factory.ts
import { CreditoComunitario } from '../models/contas/creditocomunitario.model';
import { TipoConta } from '../enums/tiposconta.enum';

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
