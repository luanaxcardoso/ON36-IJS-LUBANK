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
import { GerenteService } from '../../application/services/gerente.service';
import { Gerente } from '../../domain/models/gerente.model';
import { Cliente } from '../../domain/models/cliente.model';
import { CreateGerenteDto } from '../../application/dto/gerente/create-gerente.dto';
import { UpdateGerenteDto } from '../../application/dto/gerente/update-gerente.dto';

@Controller('gerente')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post('criar')
  async criarGerente(@Body() createGerenteDto: CreateGerenteDto): Promise<Gerente> {
    console.log('Recebendo pedido para criar gerente:', createGerenteDto);
    return this.gerenteService.criarGerente(createGerenteDto);
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
    @Body() updateGerenteDto: UpdateGerenteDto,
  ): Promise<Gerente> {
    console.log(
      `Recebendo pedido para atualizar gerente com id ${id}:`,
      updateGerenteDto,
    );
    return this.gerenteService.atualizarGerente(id, updateGerenteDto);
  }

  @Delete('deletar/:id')
  async deletarGerente(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    console.log('Recebendo pedido para deletar gerente com id:', id);
    return this.gerenteService.deletarGerente(id);
  }

  @Post('associarcliente/:gerenteId')
  async associarClienteAoGerente(
    @Param('gerenteId', ParseIntPipe) gerenteId: number,
    @Body() cliente: Cliente,
  ): Promise<Gerente> {
    console.log('Associando cliente ao gerente:', gerenteId, cliente);
    const gerenteAtualizado =
      await this.gerenteService.adicionarClienteAoGerente(gerenteId, cliente);
    return gerenteAtualizado;
  }
}
