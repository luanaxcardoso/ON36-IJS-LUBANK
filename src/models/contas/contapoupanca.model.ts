import { TipoConta } from '../../enums/tiposconta.enum';
import { Conta } from './conta.model';

export class ContaPoupanca extends Conta {
  rendimentoMensal: number;

  constructor(
    id: number,
    saldo: number,
    clienteId: number,
    rendimentoMensal: number,
  ) {
    super(id, TipoConta.CONTA_POUPANCA, saldo, clienteId);
    this.rendimentoMensal = rendimentoMensal;
  }
}
