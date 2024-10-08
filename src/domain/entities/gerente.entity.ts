import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { InterfacePessoa } from '../interfaces/pessoa.interface';
import { Cliente } from './cliente.entity';
import { Conta } from './contas/conta.entity';

@Entity('gerentes')
export class Gerente implements InterfacePessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  dataNascimento: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  endereco: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  cep: string;

  @Column()
  cpf: string;

  @Column({ type: 'numeric', nullable: true })  
  rendaSalarial?: number;

  @Column({ default: true })
  statusAtivo: boolean;

  @ManyToMany(() => Cliente, cliente => cliente.gerente)
  clientes: Cliente[];

  @ManyToMany(() => Conta, conta => conta.gerente)
  contas: Conta[];

  constructor(partial: Partial<Gerente>) {
    Object.assign(this, partial);
  }

 
}