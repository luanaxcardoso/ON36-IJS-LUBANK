import { Module } from '@nestjs/common';
import { ContaService } from '../application/services/conta.service';
import { ContaController } from '../adapters/controllers/conta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/domain/entities/cliente.entity';
import { Conta } from 'src/domain/entities/contas/conta.entity';
import { Gerente } from 'src/domain/entities/gerente.entity';
export { ContaController };

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Conta, Gerente])],
  providers: [ContaService],
  controllers: [ContaController],
  exports: [ContaService],
})
export class ContaModule {}
