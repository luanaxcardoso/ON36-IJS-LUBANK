import { Entity, Column } from 'typeorm';
import { Conta } from './conta.entity';
import { TipoConta } from '../../enums/tiposconta.enum';

@Entity('contas_corrente')
export class ContaCorrente extends Conta {
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  chequeEspecial: number;
  id: number;
  tipo: TipoConta;
  saldo: number;
  clienteId: number;

  constructor(id?: number, saldo?: number, clienteId?: number, chequeEspecial?: number) {
    super();
    this.id = id;
    this.tipo = TipoConta.CONTA_CORRENTE;
    this.saldo = saldo;
    this.clienteId = clienteId;
    this.chequeEspecial = chequeEspecial;
  }
}
