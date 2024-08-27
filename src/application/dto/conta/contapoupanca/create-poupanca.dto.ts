import { IsNumber, IsPositive } from 'class-validator';
import { TipoConta } from 'src/domain/enums/tiposconta.enum';

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

  @IsNumber()
  tipo: TipoConta = TipoConta.CONTA_POUPANCA;
}
