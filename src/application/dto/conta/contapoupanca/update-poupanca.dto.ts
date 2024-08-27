import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { TipoConta } from 'src/domain/enums/tiposconta.enum';

export class UpdateContaPoupancaDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  saldo?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  rendimentoMensal?: number;

  @IsNumber()
  tipo: TipoConta = TipoConta.CONTA_POUPANCA;
}
