import {
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsString,
  IsMobilePhone,
  Length,
  IsBoolean,
  Min,
  IsArray,
  IsOptional,
  ArrayNotEmpty,
} from 'class-validator';
import { Conta } from '../../../db/entities/conta.entity';
import { InterfacePessoa } from '../../../domain/interfaces/pessoa.interface';

export class CreateGerenteDto implements InterfacePessoa {
  @IsOptional()
  @IsNumber({}, { message: 'O ID deve ser um número.' })
  id?: number;

  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString()
  nome: string;

  @IsString()
  dataNascimento: string;

  @IsEmail({}, { message: 'Email inválido.' })
  email: string;

  @IsMobilePhone('pt-BR')
  telefone: string;

  @IsString()
  endereco: string;

  @IsString()
  cidade: string;

  @IsString()
  estado: string;

  @IsString()
  cep: string;

  @IsString()
  cpf: string;

  @IsOptional()
  @IsNumber({}, { message: 'A renda salarial deve ser um número.' })
  rendaSalarial?: number;

  @IsNotEmpty({ message: 'O status ativo é obrigatório.' })
  @IsBoolean({ message: 'O status ativo deve ser verdadeiro ou falso.' })
  statusAtivo: boolean;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  contas?: Conta[];
}
