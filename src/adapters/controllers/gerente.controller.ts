import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { GerenteService } from '../../application/services/gerente.service';
import { Gerente } from '../../db/entities/gerente.entity';
import { Cliente } from '../../db/entities/cliente.entity';
import { CreateGerenteDto } from '../../application/dto/gerente/create-gerente.dto';
import { UpdateGerenteDto } from '../../application/dto/gerente/update-gerente.dto';

@Controller('gerente')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post('criar')
  async criarGerente(
    @Body() createGerenteDto: CreateGerenteDto,
  ): Promise<Gerente> {
    console.log('Recebendo pedido para criar gerente:', createGerenteDto);
    return this.gerenteService.criarGerente(createGerenteDto);
  }

  @Get(':id')
  async buscarGerente(@Param('id', ParseIntPipe) id: number): Promise<Gerente> {
    console.log('Recebendo pedido para buscar gerente com id:', id);

    if (!id || isNaN(id)) {
      throw new BadRequestException('ID inválido');
    }

    const gerente = await this.gerenteService.buscarGerente(id);

    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado`);
    }

    return gerente;
  }

  @Get()
  async buscarGerentes(): Promise<Gerente[]> {
    console.log('Recebendo pedido para buscar todos os gerentes');
    return this.gerenteService.buscarGerentes();
  }

  @Patch('atualizar/:id')
  async atualizarGerente(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGerenteDto: UpdateGerenteDto,
  ): Promise<Gerente> {
    console.log(
      `Recebendo pedido para atualizar gerente com id ${id}:`,
      updateGerenteDto,
    );

    if (!id || isNaN(id)) {
      throw new BadRequestException('ID inválido');
    }

    const gerenteAtualizado = await this.gerenteService.atualizarGerente(
      id,
      updateGerenteDto,
    );

    if (!gerenteAtualizado) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado`);
    }

    return gerenteAtualizado;
  }

  @Delete('deletar/:id')
  async deletarGerente(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    console.log('Recebendo pedido para deletar gerente com id:', id);

    if (!id || isNaN(id)) {
      throw new BadRequestException('ID inválido');
    }

    return this.gerenteService.deletarGerente(id);
  }

  @Post('associarcliente/:gerenteId')
  async associarClienteAoGerente(
    @Param('gerenteId', ParseIntPipe) gerenteId: number,
    @Body() cliente: Cliente,
  ): Promise<Gerente> {
    console.log('Associando cliente ao gerente:', gerenteId, cliente);
    return this.gerenteService.adicionarClienteAoGerente(gerenteId, cliente);
  }
}
