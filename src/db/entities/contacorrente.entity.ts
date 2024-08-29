import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNumber, Min } from 'class-validator';
import { Conta } from './conta.entity';

@Entity()
export class ContaCorrente extends Conta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  @IsNumber()
  @Min(0)
  chequeEspecial: number;

  @ManyToOne(() => Conta, (conta) => conta.contaCorrente)
  conta: Conta;

  constructor() {
    super();
    this.chequeEspecial = 0;
  }
}
