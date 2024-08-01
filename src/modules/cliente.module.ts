import { Module } from '@nestjs/common';
import { ClienteService } from '../services/cliente.service';
import { ClienteController } from '../controllers/cliente.controller';
import { ContaModule } from '../modules/conta.module';
import { ContaService } from '../services/conta.service';

@Module({
  imports: [ContaModule],
  controllers: [ClienteController],
  providers: [ClienteService, ContaService],
})
export class ClienteModule {}
