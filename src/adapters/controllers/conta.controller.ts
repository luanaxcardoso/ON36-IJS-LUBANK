import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ContaService } from '../../application/services/conta.service';
import { TipoConta } from '../../domain/enums/tiposconta.enum';
import { Conta } from '../../domain/models/contas/conta.model';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Post('criar')
  async criarConta(
    @Body('tipo') tipo: TipoConta,
    @Body('id', ParseIntPipe) id: number,
    @Body('saldo') saldo: number,
    @Body('clienteId', ParseIntPipe) clienteId: number,
    @Body('chequeEspecial') chequeEspecial?: number,
    @Body('rendimentoMensal') rendimentoMensal?: number,
  ): Promise<Conta> {
    return this.contaService.criarConta(
      tipo,
      id,
      saldo,
      clienteId,
      chequeEspecial,
      rendimentoMensal,
    );
  }

  @Get(':id')
  async obterConta(@Param('id', ParseIntPipe) id: number): Promise<Conta> {
    const conta = await this.contaService.obterConta(id);
    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada.`);
    }
    return conta;
  }

  @Get()
  async obterContas(): Promise<Conta[]> {
    return this.contaService.obterContas();
  }

  @Patch('atualizar/:id')
  async atualizarConta(
    @Param('id', ParseIntPipe) id: number,
    @Body('tipo') tipo: TipoConta,
  ): Promise<Conta> {
    const conta = await this.contaService.atualizarConta(id, tipo);
    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada.`);
    }
    return conta;
  }

  @Delete('remover/:id')
  async removerConta(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.contaService.removerConta(id);
    return { message: `Conta com ID ${id} removida com sucesso.` };
  }

  @Delete('removerporcliente/:clienteId')
  async removerContasPorCliente(
    @Param('clienteId', ParseIntPipe) clienteId: number,
  ): Promise<{ message: string }> {
    await this.contaService.removerContasPorCliente(clienteId);
    return { message: `Contas associadas ao cliente com ID ${clienteId} removidas com sucesso.` };
  }
}
