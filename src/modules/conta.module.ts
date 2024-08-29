import { Module } from '@nestjs/common';
import { ContaService } from '../application/services/conta.service';
import { ContaController } from '../adapters/controllers/conta.controller';
export { ContaController };

@Module({
  providers: [ContaService],
  controllers: [ContaController],
  exports: [ContaService],
})
export class ContaModule {}