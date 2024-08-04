import { TipoConta } from '../../enums/tiposconta.enum';
import { Conta } from './conta.model';

export class ContaPoupanca extends Conta {
  constructor(
    id: number,
    saldo: number,
    clienteId: number,
    public rendimentoMensal: number,
  ) {
    super(id, TipoConta.CONTA_POUPANCA, saldo, clienteId);
  }
}
