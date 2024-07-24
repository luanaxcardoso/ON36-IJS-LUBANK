import { Module } from '@nestjs/common';
import { GerenteController } from './gerente.controller';
import { GerenteService } from './gerente.service';
import { ClienteModule } from '../cliente/cliente.module';
import { ContaModule } from '../conta/conta.module';

@Module({
  imports: [ClienteModule, ContaModule],
  controllers: [GerenteController],
  providers: [GerenteService],
  exports: [GerenteService], 
})
export class GerenteModule {}
