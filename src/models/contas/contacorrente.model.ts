import { Conta } from './conta.model';
import { TipoConta } from '../../enums/tiposconta.enum';

export class ContaCorrente extends Conta {
  constructor(
    id: number,
    saldo: number,
    clienteId: number,
    public creditoComunitario: number
  ) {
    super(id, TipoConta.CONTA_CORRENTE, saldo, clienteId);
  }
}


