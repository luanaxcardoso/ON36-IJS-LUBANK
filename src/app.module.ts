import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; 
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './modules/cliente.module';
import { ClienteController } from './adapters/controllers/cliente.controller';
import { ClienteService } from './application/services/cliente.service';
import { GerenteController } from './adapters/controllers/gerente.controller';
import { GerenteService } from './application/services/gerente.service';
import { GerenteModule } from './modules/gerente.module';
import { ContaController, ContaModule } from './modules/conta.module';
import { ViaCepService } from './application/services/viacep.service';
import { DbModule } from './db/db.module';
import { ContaService } from './application/services/conta.service';
import { Cliente } from './db/entities/cliente.entity';
import { Conta } from './db/entities/conta.entity';
import { Gerente } from './db/entities/gerente.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    HttpModule,
    ClienteModule,
    GerenteModule,
    ContaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost', 
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'lubank',
      entities: [Cliente, Conta, Gerente],
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    DbModule
  ],
  controllers: [ClienteController, GerenteController, ContaController],
  providers: [ClienteService, GerenteService, ViaCepService,ContaService],
})
export class AppModule {}
