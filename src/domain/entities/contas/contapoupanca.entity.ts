import { Entity, Column } from 'typeorm';
import { Conta } from './conta.entity';
import { TipoConta } from '../../enums/tiposconta.enum';

@Entity('contas_poupancas')
export class ContaPoupanca extends Conta {
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  rendimentoMensal: number;
  id: number;
  tipo: TipoConta;
  saldo: number;
  clienteId: number;

  constructor(id?: number, saldo?: number, clienteId?: number, rendimentoMensal?: number) {
    super();
    this.id = id;
    this.tipo = TipoConta.CONTA_POUPANCA;
    this.saldo = saldo;
    this.clienteId = clienteId;
    this.rendimentoMensal = rendimentoMensal;
  }
}
