import { Conta } from './conta.model';
import { TipoConta } from '../../enums/tiposconta.enum';

export class CreditoComunitario extends Conta {
  constructor(
    id: number,
    saldo: number,
    clienteId: number,
    public limiteCredito: number
  ) {
    super(id, TipoConta.CREDITO_COMUNITARIO, saldo, clienteId);
  }
}
