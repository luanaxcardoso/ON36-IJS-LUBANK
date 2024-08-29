import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNumber, Min } from 'class-validator';
import { TipoConta } from './../../domain/enums/tiposconta.enum';
import { Conta } from './conta.entity';

@Entity()
export class ContaPoupanca extends Conta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  @IsNumber()
  @Min(0)
  rendimentoMensal: number;

  @ManyToOne(() => Conta, (conta) => conta.contaPoupanca)
  conta: Conta;

  constructor(
    id: number,
    saldo: number,
    clienteId: number,
    rendimentoMensal: number,
  ) {
    super();
    this.id = id;
    this.tipoConta = TipoConta.CONTA_POUPANCA;
    this.saldo = saldo;
    this.clienteId = clienteId;
    this.rendimentoMensal = rendimentoMensal;
  }
}
