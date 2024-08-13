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
} from '@nestjs/common';
import { ClienteService } from '../../application/services/cliente.service';
import { Cliente } from '../../domain/models/cliente.model';
import { InterfacePessoa } from '../../domain/interfaces/pessoa.interface';
import { ViaCepService } from '../../application/services/viacep.service';

@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly viaCepService: ViaCepService,
  ) {}

  @Post('adicionar')
  adicionarCliente(@Body() cliente: Cliente) {
    const clienteAdicionado = this.clienteService.adicionarCliente(cliente);
    return clienteAdicionado;
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
  atualizarCliente(
    @Param('id', ParseIntPipe) id: number,
    @Body() atualizarCliente: Partial<Cliente>,
  ) {
    return this.clienteService.atualizarCliente(id, atualizarCliente);
  }

  @Delete('deletar/:id')
  deletarCliente(@Param('id', ParseIntPipe) id: number): { message: string } {
    console.log('Recebendo pedido para deletar cliente com id:', id);
    return this.clienteService.deletarCliente(id);
  }

  @Post('associarconta')
  associarConta(@Body() body: { clienteId: number; contaId: number }) {
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
