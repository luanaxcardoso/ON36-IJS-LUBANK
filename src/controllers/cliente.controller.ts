import { Controller, Post, Body, Get, Param, Patch, NotFoundException } from '@nestjs/common';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';


@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('adicionar')
  adicionarCliente(
    @Body() cliente: Cliente
  ) {
    return this.clienteService.adicionarCliente(cliente);
  }

  @Post('verificarcredito')
  verificarCreditoComunitario(@Body('id') id: number) {
    return this.clienteService.verificarCreditoComunitario(id);
  }

  @Post('associarconta')
  associarConta(
    @Body() body: { clienteId: number, contaId: number }
  ) {
    return this.clienteService.associarConta(body.clienteId, body.contaId);
  }

  @Get(':id')
  async buscarCliente(@Param('id') id: string) {
    console.log(`Buscar cliente ID: ${id}`);  
    const idNumber = parseInt(id, 10);
    const cliente = this.clienteService.buscarCliente(idNumber);
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${idNumber} não encontrado.`);
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
    @Param('id') id: number,
    @Body() atualizarCliente: Cliente
  ) {
    return this.clienteService.atualizarCliente(id, atualizarCliente);
  }
  
  
}