
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { TipoConta } from 'src/domain/enums/tiposconta.enum';

export class UpdateContaCorrenteDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  chequeEspecial?: number;
  tipo: TipoConta = TipoConta.CONTA_CORRENTE;
}
