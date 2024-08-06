import { Controller, 
  Post, 
  Get, 
  Patch, 
  Delete,
  Param, 
  Body, 
  ParseIntPipe, 
  NotFoundException } from '@nestjs/common';
import { GerenteService } from '../services/gerente.service';
import { Gerente } from '../models/gerente.model';
import { Cliente } from '../models/cliente.model';

@Controller('gerente')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post('criar')
  criarGerente(@Body() gerente: Gerente): Gerente {
    console.log('Recebendo pedido para criar gerente:', gerente);
    return this.gerenteService.criarGerente(gerente);
  }

  @Get(':id')
  async buscarGerente(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Gerente | { message: string }> {
    console.log('Recebendo pedido para buscar gerente com id:', id);
    try {
      const gerente = await this.gerenteService.buscarGerente(id);
      if (!gerente) {
        throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
      }
      return gerente;
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

  @Post('associarcliente/:gerenteId')
  async associarClienteAoGerente(
    @Param('gerenteId', ParseIntPipe) gerenteId: number,
    @Body() cliente: Cliente
  ): Promise<Gerente | { message: string }> {
    console.log('Associar cliente ao gerente:', gerenteId, cliente);
    try {
      const gerenteAtualizado = await this.gerenteService.adicionarClienteAoGerente(gerenteId, cliente);
      if (!gerenteAtualizado) {
        throw new NotFoundException(`Gerente com ID ${gerenteId} não encontrado.`);
      }
      return gerenteAtualizado;
    } catch (error) {
      console.error('Erro ao associar cliente ao gerente:', error.message);
      return { message: error.message };
    }
  }
}
