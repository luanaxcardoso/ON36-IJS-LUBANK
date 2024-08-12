import { Module } from '@nestjs/common';
import { GerenteController } from '../controllers/gerente.controller';
import { GerenteService } from '../services/gerente.service';
import { ClienteModule } from './cliente.module'; 
import { ContaModule } from './conta.module';

@Module({
  imports: [ClienteModule, ContaModule], 
  controllers: [GerenteController],
  providers: [GerenteService],
  exports: [GerenteService],
})
export class GerenteModule {}
