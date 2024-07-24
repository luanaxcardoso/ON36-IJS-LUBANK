import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { ContaService } from './conta.service';
import { Conta } from './conta.model';
import { TipoConta } from 'src/enums/tiposconta.enum';


@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Post('criar')
  criarConta(
    @Body('id') id: number,
    @Body('tipo') tipo: TipoConta,
    @Body('saldo') saldo: number,
    @Body('clienteId') clienteId: number,
  ): Conta {
    const novaConta = new Conta(id, tipo, saldo, clienteId);
    return this.contaService.criarConta(novaConta);
  }

  @Get(':id')
  obterConta(@Param('id') id: number): Conta | undefined {
    return this.contaService.obterConta(id);
  }

  @Get()
  obterContas(): Conta[] {
    return this.contaService.obterContas();
  }

  @Patch('atualizar/:id')
  atualizarConta(
    @Param('id') id: number,
    @Body('tipo') tipo: TipoConta,
  ): Conta | undefined {
    return this.contaService.atualizarConta(id, tipo);
  }

  @Delete('deletar/:id')
  deletarConta(@Param('id') id: number): boolean {
    return this.contaService.deletarConta(id);
  }
}
