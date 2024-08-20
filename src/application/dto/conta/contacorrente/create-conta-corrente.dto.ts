// src/domain/dto/conta-corrente-create.dto.ts
import { IsNumber, IsPositive } from 'class-validator';

export class CreateContaCorrenteDto {
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
  chequeEspecial: number;
}
