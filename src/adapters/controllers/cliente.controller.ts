import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  NotFoundException,
  Delete,
  ParseIntPipe,
  Query,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { ClienteService } from '../../application/services/cliente.service';
import { CreateClienteDto } from '../../application/dto/cliente/create-cliente.dto';
import { UpdateClienteDto } from '../../application/dto/cliente/update-cliente.dto';
import { InterfacePessoa } from '../../domain/interfaces/pessoa.interface';
import { ViaCepService } from '../../application/services/viacep.service';

@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly viaCepService: ViaCepService,
  ) {}

  @Post('adicionar')
  async adicionarCliente(@Body() clienteDto: CreateClienteDto) {
    try {
      const clienteAdicionado = await this.clienteService.adicionarCliente(
        clienteDto,
      );
      return clienteAdicionado;
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
  ): Promise<InterfacePessoa> {
    const cliente = this.clienteService.buscarCliente(id);
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }

  @Get()
  async buscarClientes() {
    console.log(`Todos os clientes.`);
    return this.clienteService.buscarClientes();
  }

  @Patch('atualizar/:id')
  async atualizarCliente(
    @Param('id', ParseIntPipe) id: number,
    @Body() atualizarCliente: UpdateClienteDto,
  ) {
    return this.clienteService.atualizarCliente(id, atualizarCliente);
  }

  @Delete('deletar/:id')
  async deletarCliente(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    console.log('Recebendo pedido para deletar cliente com id:', id);
    return this.clienteService.deletarCliente(id);
  }

  @Post('associarconta')
  async associarConta(@Body() body: { clienteId: number; contaId: number }) {
    return this.clienteService.associarConta(body.clienteId, body.contaId);
  }

  @Get('testarviacep')
  async testarViaCep(@Query('cep') cep: string) {
    console.log(`Consultando CEP: ${cep}`);
    try {
      const resultado = await this.viaCepService.consultarCep(cep);
      console.log('Resultado da consulta:', resultado);
      return resultado;
    } catch (error) {
      console.error('Erro ao consultar CEP:', error);
      throw error;
    }
  }
}
