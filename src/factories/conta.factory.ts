import { Conta } from '../models/contas/conta.model';
import { TipoConta } from 'src/enums/tiposconta.enum';

export class ContaFactory {
  static criarConta(
    id: number,
    tipo: TipoConta,
    saldo: number,
    clienteId: number
  ): Conta {
    return new Conta(id, tipo, saldo, clienteId);
  }
}
