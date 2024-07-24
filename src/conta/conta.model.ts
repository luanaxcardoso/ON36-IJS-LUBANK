import { TipoConta } from "src/enums/tiposconta.enum";

export class Conta {
  constructor(
    public id: number,
    public tipo: TipoConta,
    public saldo: number,
    public clienteId: number
  ) {}
}
