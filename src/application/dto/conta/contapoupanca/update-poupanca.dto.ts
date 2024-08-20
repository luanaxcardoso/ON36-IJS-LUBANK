import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateContaPoupancaDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  saldo?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  rendimentoMensal?: number;
}
