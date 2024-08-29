import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ClienteService } from '../../application/services/cliente.service';
import { CreateClienteDto } from '../../application/dto/cliente/create-cliente.dto';
import { UpdateClienteDto } from '../../application/dto/cliente/update-cliente.dto';
import { Cliente } from '../../db/entities/cliente.entity'; // Atualizado para usar Cliente
import { ViaCepService } from '../../application/services/viacep.service';

@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly viaCepService: ViaCepService,
  ) {}

  @Post('adicionar')
  async adicionarCliente(@Body() clienteDto: CreateClienteDto): Promise<Cliente> {
    try {
      return await this.clienteService.adicionarCliente(clienteDto);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new BadRequestException('Erro ao adicionar cliente.');
    }
  }

  @Get(':id')
  async buscarCliente(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Cliente> { // Atualizado para usar Cliente
    const cliente = await this.clienteService.buscarCliente(id);
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }

  @Get()
  async buscarClientes(): Promise<Cliente[]> {
    console.log(`Todos os clientes.`);
    return this.clienteService.buscarClientes();
  }

  @Patch('atualizar/:id')
  async atualizarCliente(
    @Param('id', ParseIntPipe) id: number,
    @Body() atualizarCliente: UpdateClienteDto,
  ): Promise<Cliente> {
    return this.clienteService.atualizarCliente(id, atualizarCliente);
  }

  @Delete('deletar/:id')
  async deletarCliente(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    console.log('Recebendo pedido para deletar cliente com id:', id);
    return this.clienteService.deletarCliente(id);
  }

  @Post('associarconta')
  async associarConta(@Body() body: { clienteId: number; contaId: number }): Promise<boolean> {
    return this.clienteService.associarConta(body.clienteId, body.contaId);
  }

  @Get('consultarcep/:id')
  async consultarCep(@Param('id', ParseIntPipe) clienteId: number): Promise<any> {
    return this.clienteService.consultarCep(clienteId);
  }

  @Get('status')
  async encontrarPorStatus(): Promise<Cliente[]> {
    return this.clienteService.encontrarPorStatus();
  }

  @Get('cidade')
  async encontrarPorCidade(@Query('cidade') cidade: string): Promise<Cliente[]> {
    return this.clienteService.encontrarPorCidade(cidade);
  }

  @Get('estado')
  async encontrarPorEstado(@Query('estado') estado: string): Promise<Cliente[]> {
    return this.clienteService.encontrarPorEstado(estado);
  }

  @Patch('desativar/:id')
  async desativarCliente(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.clienteService.desativarCliente(id);
  }

  @Patch('ativar/:id')
  async ativarCliente(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.clienteService.ativarCliente(id);
  }

  @Patch('atualizarrenda/:id')
  async atualizarRenda(
    @Param('id', ParseIntPipe) id: number,
    @Body('rendaSalarial') rendaSalarial: number,
  ): Promise<void> {
    await this.clienteService.atualizarRenda(id, rendaSalarial);
  }

  @Get('faixarenda')
  async encontrarPorFaixaDeRenda(
    @Query('min') minRenda: number,
    @Query('max') maxRenda: number,
  ): Promise<Cliente[]> {
    return this.clienteService.encontrarPorFaixaDeRenda(minRenda, maxRenda);
  }

  @Get('contas')
  async encontrarPorContas(): Promise<Cliente[]> {
    return this.clienteService.encontrarPorContas();
  }

  @Get('ativo/:id')
  async clienteAtivo(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.clienteService.clienteAtivo(id);
  }

  @Get('cep')
  async encontrarPorCep(@Query('cep') cep: string): Promise<Cliente[]> {
    return this.clienteService.encontrarPorCep(cep);
  }
}
