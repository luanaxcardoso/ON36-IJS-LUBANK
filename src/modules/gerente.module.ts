import { Module } from '@nestjs/common';
import { GerenteController } from '../controllers/gerente.controller';
import { GerenteService } from '../services/gerente.service';
import { ClienteModule } from './cliente.module';
import { ContaModule } from './conta.module';
import { ClienteService } from '../services/cliente.service';
import { ContaService } from '../services/conta.service';

@Module({
  imports: [ClienteModule, ContaModule],
  controllers: [GerenteController],
  providers: [GerenteService, ClienteService, ContaService],
  exports: [GerenteService],
})
export class GerenteModule {}
