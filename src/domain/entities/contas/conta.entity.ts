import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { TipoConta } from '../../enums/tiposconta.enum';

@Entity('contas')
export class Conta extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TipoConta,
  })
  tipo: TipoConta;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  saldo: number;

  @Column()
  clienteId: number;
  cliente: any;
  gerente: any;
}
