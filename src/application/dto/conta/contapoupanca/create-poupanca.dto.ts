import { IsNumber, IsPositive } from 'class-validator';

export class CreateContaPoupancaDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsNumber()
  @IsPositive()
  saldo: number;

  @IsNumber()
  @IsPositive()
  clienteId: number;

  @IsNumber()
  @IsPositive()
  rendimentoMensal: number;
}
