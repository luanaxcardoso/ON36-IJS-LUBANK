import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';


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
  verificarCreditoComunitario(
    @Body('id') id: number
  ) {
    return this.clienteService.verificarCreditoComunitario(id);
  }

  @Post('associarconta')
  associarConta(
    @Body() body: { clienteId: number, contaId: number }
  ) {
    return this.clienteService.associarConta(body.clienteId, body.contaId);
  }

  @Get(':id')
  obterCliente(@Param('id') id: number) {
    return this.clienteService.obterCliente(id);
  }

  @Get()
  obterClientes() {
    return this.clienteService.obterClientes();
  }

  @Patch('atualizar/:id')
  atualizarCliente(
    @Param('id') id: number,
    @Body() atualizarCliente: Cliente
  ) {
    return this.clienteService.atualizarCliente(id, atualizarCliente);
  }
  

  @Delete(':id')
  removerCliente(@Param('id') id: number) {
    return this.clienteService.removerCliente(id);
  }


  
}
