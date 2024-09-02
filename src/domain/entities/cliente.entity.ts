import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Conta } from './contas/conta.entity';
import { InterfacePessoa } from '../interfaces/pessoa.interface';

@Entity('clientes')
export class Cliente implements InterfacePessoa {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @Column()
  public dataNascimento: string;

  @Column()
  public email: string;

  @Column()
  public telefone: string;

  @Column()
  public endereco: string;

  @Column()
  public cidade: string;

  @Column()
  public estado: string;

  @Column()
  public cep: string;

  @Column({ unique: true })
  public cpf: string;

  @Column('decimal')
  public rendaSalarial: number;

  @Column({ default: true })
  public statusAtivo: boolean;

  @OneToMany(() => Conta, (conta) => conta.cliente, { cascade: true })
  public conta: Conta[]; 

  gerente: any;
}
