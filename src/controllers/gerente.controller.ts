import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { GerenteService } from '../services/gerente.service';
import { Gerente } from '../models/gerente.model';
import { Cliente } from '../models/cliente.model';

@Controller('gerente')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post('criar')
  async criarGerente(@Body() gerente: Gerente): Promise<Gerente> {
    console.log('Recebendo pedido para criar gerente:', gerente);
    return this.gerenteService.criarGerente(gerente);
  }

  @Get(':id')
  async buscarGerente(@Param('id', ParseIntPipe) id: number): Promise<Gerente> {
    console.log('Recebendo pedido para buscar gerente com id:', id);
    return this.gerenteService.buscarGerente(id);
  }

  @Get()
  async buscarGerentes(): Promise<Gerente[]> {
    console.log('Recebendo pedido para buscar todos os gerentes');
    return this.gerenteService.buscarGerentes();
  }

  @Patch('atualizar/:id')
  async atualizarGerente(
    @Param('id', ParseIntPipe) id: number,
    @Body() gerenteAtualizado: Partial<Gerente>,
  ): Promise<Gerente> {
    console.log(`Recebendo pedido para atualizar gerente com id ${id}:`, gerenteAtualizado);
    return this.gerenteService.atualizarGerente(id, gerenteAtualizado);
  }

  @Delete('deletar/:id')
  async deletarGerente(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    console.log('Recebendo pedido para deletar gerente com id:', id);
    return this.gerenteService.deletarGerente(id);
  }

  @Post('associarcliente/:gerenteId')
  async associarClienteAoGerente(
    @Param('gerenteId', ParseIntPipe) gerenteId: number,
    @Body() cliente: Cliente
  ): Promise<Gerente> {
    console.log('Associar cliente ao gerente:', gerenteId, cliente);
    return this.gerenteService.adicionarClienteAoGerente(gerenteId, cliente);
  }
}
