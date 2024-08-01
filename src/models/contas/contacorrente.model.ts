import { TipoConta } from '../../enums/tiposconta.enum';
import { Conta } from './conta.model';
export class ContaCorrente extends Conta {
  constructor(
    id: number,
    saldo: number,
    clienteId: number,
    public limiteBancoComunitario: number,
  ) {
    super(id, TipoConta.CONTA_CORRENTE, saldo, clienteId);
  }
}

