import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClienteService } from '../services/cliente.service';
import { ClienteController } from '../controllers/cliente.controller';
import { ViaCepService } from '../services/viacep.service'; // Atualize o caminho conforme necessário
import { ContaModule } from './conta.module';
import { ContaService } from '../services/conta.service';

@Module({
  imports: [HttpModule, ContaModule], 
  controllers: [ClienteController],
  providers: [ClienteService, ViaCepService, ContaService],
  exports: [ClienteService, ViaCepService], 
})
export class ClienteModule {}
