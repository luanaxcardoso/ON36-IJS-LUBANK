import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClienteModule } from './modules/cliente.module';
import { ClienteController } from './adapters/controllers/cliente.controller';
import { ClienteService } from './application/services/cliente.service';
import { GerenteController } from './adapters/controllers/gerente.controller';
import { GerenteService } from './application/services/gerente.service';
import { GerenteModule } from './modules/gerente.module';
import { ContaModule } from './modules/conta.module';
import { ViaCepService } from './application/services/viacep.service';
import { DatabaseModule } from './modules/database.module';

@Global()
@Module({
  imports: [  
    HttpModule,
    ClienteModule,
    GerenteModule,
    ContaModule,
    DatabaseModule,
  ],
  controllers: [ClienteController, GerenteController],
  providers: [ClienteService, GerenteService, ViaCepService,
    
  ],
})
export class AppModule {}