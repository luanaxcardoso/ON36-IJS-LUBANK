import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsEnum, IsNumber, Min } from 'class-validator';
import { TipoConta } from './../../domain/enums/tiposconta.enum';
import { Cliente } from './cliente.entity';

@Entity()
export class Conta {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TipoConta,
  })
  @IsEnum(TipoConta)
  tipo: TipoConta;

  @Column('decimal')
  @IsNumber()
  @Min(0)
  saldo: number;

  @Column()
  clienteId: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.conta)
  cliente: Cliente;
}
