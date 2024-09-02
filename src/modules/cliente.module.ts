import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClienteService } from '../application/services/cliente.service';
import { ClienteController } from '../adapters/controllers/cliente.controller';
import { ViaCepService } from '../application/services/viacep.service';
import { ViaCepModule } from '../modules/viacep.module';
import { ContaModule } from './conta.module';
import { ContaService } from '../application/services/conta.service';
import { Cliente } from 'src/domain/entities/cliente.entity';
import { Gerente } from 'src/domain/entities/gerente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conta } from 'src/domain/entities/contas/conta.entity';

@Module({
  imports: [
    HttpModule,
    ContaModule,
    ViaCepModule,
    TypeOrmModule.forFeature([Cliente, Conta, Gerente]),
  ],
  controllers: [ClienteController],
  providers: [ClienteService, ViaCepService, ContaService],
  exports: [ClienteService, ViaCepService],
})
export class ClienteModule {}
