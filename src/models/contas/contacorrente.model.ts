import { TipoConta } from '../../enums/tiposconta.enum';
import { Conta } from './conta.model';

export class ContaCorrente extends Conta {
  limiteBancoComunitario: number;

  constructor(
    id: number,
    saldo: number,
    clienteId: number,
    limiteBancoComunitario: number,
  ) {
    super(id, TipoConta.CONTA_CORRENTE, saldo, clienteId);
    this.limiteBancoComunitario = limiteBancoComunitario;
  }
}

