import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClienteService } from '../application/services/cliente.service';
import { ClienteController } from '../adapters/controllers/cliente.controller';
import { ViaCepService } from '../application/services/viacep.service'; 
import { ViaCepModule } from '../modules/viacep.module';
import { ContaModule } from './conta.module';
import { ContaService } from '../application/services/conta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/db/entities/cliente.entity';
import { ClienteRepository } from 'src/db/repositories/cliente.repository';

@Module({
  imports: [HttpModule, ContaModule, ViaCepModule, TypeOrmModule.forFeature([Cliente])],
  controllers: [ClienteController],
  providers: [ClienteService, ViaCepService, ContaService, ClienteRepository],
  exports: [ClienteService, ViaCepService, ClienteRepository],
})
export class ClienteModule {}