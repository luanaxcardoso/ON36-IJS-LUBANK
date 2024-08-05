import { Controller, Post, Get, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ContaService } from '../services/conta.service';
import { TipoConta } from '../enums/tiposconta.enum';
import { Conta } from '../models/contas/conta.model';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Post('criar')
  criarConta(
    @Body('tipo') tipo: TipoConta,
    @Body('id', ParseIntPipe) id: number,
    @Body('saldo') saldo: number,
    @Body('clienteId', ParseIntPipe) clienteId: number,
    @Body('chequeEspecial') chequeEspecial?: number,
    @Body('rendimentoMensal') rendimentoMensal?: number,
  ): Conta {
    return this.contaService.criarConta(tipo, id, saldo, clienteId, chequeEspecial, rendimentoMensal);
  }

  @Get(':id')
  obterConta(@Param('id', ParseIntPipe) id: number): Conta | undefined {
    return this.contaService.obterConta(id);
  }

  @Get()
  obterContas(): Conta[] {
    return this.contaService.obterContas();
  }

  @Patch('atualizar/:id')
  atualizarConta(
    @Param('id', ParseIntPipe) id: number,
    @Body('tipo') tipo: TipoConta,
  ): Conta | undefined {
    return this.contaService.atualizarConta(id, tipo);
  }

  @Delete('remover/:id')
  removerConta(@Param('id', ParseIntPipe) id: number): { message: string } {
    this.contaService.removerConta(id);
    return { message: `Conta removida com sucesso.` };
  }

  @Delete('removerporcliente/:clienteId')
  removerContasPorCliente(@Param('clienteId', ParseIntPipe) clienteId: number): { message: string } {
    this.contaService.removerContasPorCliente(clienteId);
    return { message: `Contas removidas com sucesso.` };
  }
}
