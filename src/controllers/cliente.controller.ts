import { Controller, Post, Body, Get, Param, Patch, NotFoundException, Delete, ParseIntPipe } from '@nestjs/common';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { InterfacePessoa } from 'src/interfaces/pessoa.interface';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('adicionar')
  adicionarCliente(@Body() cliente: Cliente) {
    const clienteAdicionado = this.clienteService.adicionarCliente(cliente);
    return clienteAdicionado; 
  }
  
  @Get(':id')
  async buscarCliente(@Param('id', ParseIntPipe) id: number): Promise<InterfacePessoa> {
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
    @Body() atualizarCliente: Partial<Cliente>
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
}