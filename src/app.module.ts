import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Importando HttpModule
import { ClienteModule } from './modules/cliente.module';
import { ClienteController } from './controllers/cliente.controller';
import { ClienteService } from './services/cliente.service';
import { GerenteController } from './controllers/gerente.controller';
import { GerenteService } from './services/gerente.service';
import { GerenteModule } from './modules/gerente.module';
import { ContaModule } from './modules/conta.module';
import { ViaCepService } from './services/viacep.service'; 

@Module({
  imports: [HttpModule, ClienteModule, GerenteModule, ContaModule], 
  controllers: [ClienteController, GerenteController],
  providers: [ClienteService, GerenteService, ViaCepService], 
})
export class AppModule {}
