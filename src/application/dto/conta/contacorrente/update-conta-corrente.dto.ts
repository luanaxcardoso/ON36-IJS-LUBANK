
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateContaCorrenteDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  chequeEspecial?: number;
}
