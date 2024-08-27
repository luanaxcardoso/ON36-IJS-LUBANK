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
import { CreateContaDto } from '../../application/dto/conta/create-conta.dto';
import { UpdateContaDto } from '../../application/dto/conta/update-conta.dto';
import { Conta } from '../../domain/models/contas/conta.model';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Post('criar')
  async criarConta(
    @Body() createContaDto: CreateContaDto,
  ): Promise<Conta> {
    return this.contaService.criarConta(createContaDto);
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
    @Body() updateContaDto: UpdateContaDto,
  ): Promise<Conta> {
    const conta = await this.contaService.atualizarConta(id, updateContaDto);
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
