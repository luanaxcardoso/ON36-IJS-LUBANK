import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { ClienteController } from './cliente/cliente.controller';
import { ClienteService } from './cliente/cliente.service';
import { GerenteController } from './gerente/gerente.controller';
import { GerenteService } from './gerente/gerente.service';
import { GerenteModule } from './gerente/gerente.module';
import { ContaModule } from './conta/conta.module';


@Module({
  imports: [ClienteModule, GerenteModule, ContaModule],
  controllers: [AppController, ClienteController, GerenteController],
  providers: [AppService, ClienteService, GerenteService],
})
export class AppModule {}
