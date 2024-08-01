import { Module } from '@nestjs/common';
import { ClienteModule } from './modules/cliente.module';
import { ClienteController } from './controllers/cliente.controller';
import { ClienteService } from './services/cliente.service';
import { GerenteController } from './controllers/gerente.controller';
import { GerenteService } from './services/gerente.service';
import { GerenteModule } from './modules/gerente.module';
import { ContaModule } from './modules/conta.module';

@Module({
  imports: [ClienteModule, GerenteModule, ContaModule],
  controllers: [ ClienteController, GerenteController],
  providers: [ ClienteService, GerenteService],
})
export class AppModule {}
