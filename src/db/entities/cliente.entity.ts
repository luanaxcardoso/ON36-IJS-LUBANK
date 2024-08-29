import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsString, IsEmail, IsDateString, IsNumber, Min, IsBoolean } from 'class-validator';
import { Conta } from './conta.entity'; 

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  nome: string;

  @Column()
  @IsDateString()
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

  @Column('decimal')
  @IsNumber()
  @Min(0)
  rendaSalarial: number;

  @Column({ default: true })
  @IsBoolean()
  statusAtivo: boolean;

  @OneToMany(() => Conta, (conta) => conta.cliente)
  contas: Conta[];
  gerente: any;
  conta: any;
}
