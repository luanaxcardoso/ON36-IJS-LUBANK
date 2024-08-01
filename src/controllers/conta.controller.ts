import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { ContaService } from '../services/conta.service';
import { ContaCorrente } from '../models/contas/contacorrente.model';
import { ContaPoupanca } from '../models/contas/contapoupanca.model';
import { TipoConta } from 'src/enums/tiposconta.enum';
import { Conta } from 'src/models/contas/conta.model';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Post('criar')
  criarConta(
    @Body('id') id: number,
    @Body('tipo') tipo: TipoConta,
    @Body('saldo') saldo: number,
    @Body('clienteId') clienteId: number,
  ): Conta {
    const novaConta = new Conta(id, tipo, saldo, clienteId);
    return this.contaService.criarConta(novaConta);
  }

  @Post('criar/contacorrente')
  criarContaCorrente(
    @Body('id') id: number,
    @Body('saldo') saldo: number,
    @Body('clienteId') clienteId: number,
  ): ContaCorrente {
    return this.contaService.criarContaCorrente(id, saldo, clienteId);
  }

  @Post('criar/contapoupanca')
  criarContaPoupanca(
    @Body('id') id: number,
    @Body('saldo') saldo: number,
    @Body('clienteId') clienteId: number,
    @Body('rendimentoMensal') rendimentoMensal: number,
  ): ContaPoupanca {
    return this.contaService.criarContaPoupanca(id, saldo, clienteId, rendimentoMensal);
  }

  @Get(':id')
  obterConta(@Param('id') id: number): Conta | undefined {
    return this.contaService.obterConta(id);
  }

  @Get()
  obterContas(): Conta[] {
    return this.contaService.obterContas();
  }

  @Patch('atualizar/:id')
  atualizarConta(
    @Param('id') id: number,
    @Body('tipo') tipo: TipoConta,
  ): Conta | undefined {
    return this.contaService.atualizarConta(id, tipo);
  }

  @Delete('removerporcliente/:clienteId')
  removerContasPorCliente(@Param('clienteId') clienteId: number): { message: string } {
    this.contaService.removerContasPorCliente(clienteId);
    return { message: `Conta removida com sucesso.` };
  }
}
