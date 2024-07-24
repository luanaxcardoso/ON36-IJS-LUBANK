import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';
import { ContaController } from './conta.controller'; // Se houver um controlador

@Module({
  providers: [ContaService],
  exports: [ContaService], 
})
export class ContaModule {}
