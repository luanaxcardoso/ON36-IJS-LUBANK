import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClienteModule } from './modules/cliente.module';
import { ClienteController } from './adapters/controllers/cliente.controller';
import { ClienteService } from './application/services/cliente.service';
import { GerenteController } from './adapters/controllers/gerente.controller';
import { GerenteService } from './application/services/gerente.service';
import { GerenteModule } from './modules/gerente.module';
import { ContaModule } from './modules/conta.module';
import { ViaCepService } from './application/services/viacep.service';
import { Cliente } from './domain/entities/cliente.entity';
import { Conta } from './domain/entities/contas/conta.entity';
import { ContaCorrente } from './domain/entities/contas/contacorrente.entity';
import { ContaPoupanca } from './domain/entities/contas/contapoupanca.entity';
import { Gerente } from './domain/entities/gerente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'lubank',
      entities: [Cliente, Conta, Gerente, ContaCorrente, ContaPoupanca],
      synchronize: true,
      logging: false,
    }),
    HttpModule,
    ClienteModule,
    GerenteModule,
    ContaModule,
    DatabaseModule,
  ],
  controllers: [ClienteController, GerenteController],
  providers: [ClienteService, GerenteService, ViaCepService],
})
export class AppModule {}
