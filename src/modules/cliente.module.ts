import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClienteService } from '../application/services/cliente.service';
import { ClienteController } from '../adapters/controllers/cliente.controller';
import { ViaCepService } from '../application/services/viacep.service'; 
import { ContaModule } from './conta.module';
import { ContaService } from '../application/services/conta.service';

@Module({
  imports: [HttpModule, ContaModule],
  controllers: [ClienteController],
  providers: [ClienteService, ViaCepService, ContaService],
  exports: [ClienteService, ViaCepService],
})
export class ClienteModule {}
