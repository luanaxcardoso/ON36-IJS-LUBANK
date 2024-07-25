import { Controller, Post, Body, Param, Delete, Patch, Get } from '@nestjs/common';
import { GerenteService } from './gerente.service';
import { Cliente } from '../cliente/cliente.model';
import { TipoConta } from '../enums/tiposconta.enum';

@Controller('gerente')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post('addcliente')
  adicionarCliente(@Body() cliente: Cliente) {
    return this.gerenteService.adicionarCliente(cliente);
  }

  @Delete('removercliente/:id')
  removerCliente(@Param('id') id: number) {
    return this.gerenteService.removerCliente(id);
  }

  @Post('abrirconta')
  abrirConta(@Body('clienteId') clienteId: number, @Body('tipo') tipo: TipoConta) {
    return this.gerenteService.abrirConta(clienteId, tipo);
  }

  @Delete('fecharconta/:id')
  fecharConta(@Param('id') id: number) {
    return this.gerenteService.fecharConta(id);
  }

  @Patch('modificarconta/:id')
  modificarConta(@Param('id') id: number, @Body('novoTipo') novoTipo: TipoConta) {
    return this.gerenteService.modificarConta(id, novoTipo);
  }

  @Get('clientes')
  obterClientes() {
    return this.gerenteService.obterClientes();
  }

  @Get('contas')
  obterContas() {
    return this.gerenteService.obterContas();
  }
}
