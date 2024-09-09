import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, TableInheritance } from 'typeorm';
import { TipoConta } from '../../enums/tiposconta.enum';

@Entity('contas')
@TableInheritance({ column: { type: 'enum', name: 'tipo', enum: TipoConta } })
export class Conta extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  saldo: number;

  @Column()
  clienteId: number;

  @Column({ type: 'enum', enum: TipoConta })
  tipo: TipoConta;

  
  cliente: any;
  gerente: any;
}
