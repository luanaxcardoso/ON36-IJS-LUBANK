import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from 'src/cliente/cliente.controller'; 
import { ContaModule } from '../conta/conta.module'; 
import { ContaService } from 'src/conta/conta.service';


@Module({
  imports: [ContaModule], 
  controllers: [ClienteController],
  providers: [ClienteService, ContaService],
  
})
export class ClienteModule {}
