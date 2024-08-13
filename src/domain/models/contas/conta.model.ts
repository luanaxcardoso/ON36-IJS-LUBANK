import { TipoConta } from '../../enums/tiposconta.enum';

export class Conta {
  constructor(
    public id: number,
    public tipo: TipoConta,
    public saldo: number,
    public clienteId: number,
  ) {}
}
