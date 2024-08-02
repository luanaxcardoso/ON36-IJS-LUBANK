import { Controller, Post, Get, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { GerenteService } from '../services/gerente.service';
import { Gerente } from '../models/gerente.model';

@Controller('gerente')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post('criar')
  criarGerente(@Body() gerente: Gerente): Gerente {
    console.log('Recebendo pedido para criar gerente:', gerente);
    return this.gerenteService.criarGerente(gerente);
  }

  @Get(':id')
  buscarGerente(
    @Param('id', ParseIntPipe) id: number
  ): Gerente | { message: string } {
    console.log('Recebendo pedido para buscar gerente com id:', id);
    try {
      return this.gerenteService.buscarGerente(id);
    } catch (error) {
      console.error('Erro ao buscar gerente:', error.message);
      return { message: error.message };
    }
  }

  @Get()
  buscarGerentes(): Gerente[] {
    console.log('Recebendo pedido para buscar todos os gerentes');
    return this.gerenteService.buscarGerentes();
  }

  @Patch('atualizar/:id')
  atualizarGerente(
    @Param('id') id: number,
    @Body() gerenteAtualizado: Partial<Gerente>,
  ): Gerente | undefined {
    console.log(`Recebendo pedido para atualizar gerente com id ${id}:`, gerenteAtualizado);
    return this.gerenteService.atualizarGerente(id, gerenteAtualizado);
  }

  @Delete('deletar/:id')
  deletarGerente(
    @Param('id', ParseIntPipe) id: number
  ): { message: string } {
    console.log('Recebendo pedido para deletar gerente com id:', id);
    return this.gerenteService.deletarGerente(id);
  }
}
