import { IsNumber, IsPositive } from 'class-validator';
import { TipoConta } from 'src/domain/enums/tiposconta.enum';

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

  @IsNumber()
  tipo: TipoConta = TipoConta.CONTA_CORRENTE;
}
