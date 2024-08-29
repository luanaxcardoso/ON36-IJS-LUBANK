import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  Min,
} from 'class-validator';
import { Cliente } from './cliente.entity';
import { Conta } from './conta.entity';
import { InterfacePessoa } from '../../domain/interfaces/pessoa.interface';

@Entity()
export class Gerente implements InterfacePessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  nome: string;

  @Column()
  @IsString()
  dataNascimento: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  telefone: string;

  @Column()
  @IsString()
  endereco: string;

  @Column()
  @IsString()
  cidade: string;

  @Column()
  @IsString()
  estado: string;

  @Column()
  @IsString()
  cep: string;

  @Column()
  @IsString()
  cpf: string;

  @Column({ type: 'decimal', nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  rendaSalarial?: number;

  @Column({ default: true })
  @IsBoolean()
  statusAtivo: boolean;

  @OneToMany(() => Cliente, (cliente: Cliente) => cliente.gerente)
  clientes: Cliente[];

  @OneToMany(() => Conta, (conta) => conta.id)
  contas: Conta[];

  adicionarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
  }
}
