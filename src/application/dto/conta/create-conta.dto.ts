import { TipoConta } from '../../../domain/enums/tiposconta.enum';
import { IsEnum, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class CreateContaDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsEnum(TipoConta)
  tipo: TipoConta;

  @IsNumber()
  @IsPositive()
  saldo: number;

  @IsNumber()
  @IsPositive()
  clienteId: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  chequeEspecial?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  rendimentoMensal?: number;
}
