import { Module } from '@nestjs/common';
import { GerenteController } from '../adapters/controllers/gerente.controller';
import { GerenteService } from '../application/services/gerente.service';
import { ClienteModule } from './cliente.module';
import { ContaModule } from './conta.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/domain/entities/cliente.entity';
import { Conta } from 'src/domain/entities/contas/conta.entity';
import { Gerente } from 'src/domain/entities/gerente.entity';

@Module({
  imports: [
    ClienteModule,
    ContaModule,
    TypeOrmModule.forFeature([Cliente, Conta, Gerente]),
  ],

  controllers: [GerenteController],
  providers: [GerenteService],
  exports: [GerenteService],
})
export class GerenteModule {}
