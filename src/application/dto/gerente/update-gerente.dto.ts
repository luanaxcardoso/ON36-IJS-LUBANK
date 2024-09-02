import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
  Min,
  Length,
  ArrayNotEmpty,
} from 'class-validator';
import { Conta } from '../../../domain/entities/contas/conta.entity';

export class UpdateGerenteDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  dataNascimento?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  endereco?: string;

  @IsOptional()
  @IsString()
  cidade?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  @Length(8, 8, { message: 'O CEP deve ter 8 caracteres.' })
  cep?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsNumber({}, { message: 'A renda salarial deve ser um número.' })
  @Min(0, { message: 'A renda salarial não pode ser negativa.' })
  rendaSalarial?: number;

  @IsOptional()
  @IsBoolean({ message: 'O status ativo deve ser verdadeiro ou falso.' })
  statusAtivo?: boolean;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  contas?: Conta[];
}
