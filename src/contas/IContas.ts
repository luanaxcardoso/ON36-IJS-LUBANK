export interface IContas {
  getId(): string;
  getTipo(): string;
  getSaldo(): number;
  depositar(valor: number): void;
  sacar(valor: number): boolean;
  transferir(contaDestino: IContas, valor: number): boolean;
}
