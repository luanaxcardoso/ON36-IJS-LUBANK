import { Module } from '@nestjs/common';
import { GerenteController } from './gerente.controller';
import { GerenteService } from './gerente.service';
import { ClienteModule } from '../cliente/cliente.module';
import { ContaModule } from '../conta/conta.module';
import { ClienteService } from 'src/cliente/cliente.service';

@Module({
  imports: [ClienteModule, ContaModule],
  controllers: [GerenteController],
  providers: [GerenteService, ClienteService],
  exports: [GerenteService], 
})
export class GerenteModule {}
