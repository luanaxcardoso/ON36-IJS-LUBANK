import { Module } from '@nestjs/common';
import { ContaService } from '../services/conta.service';
import { ContaController } from '../controllers/conta.controller';
export { ContaController };

@Module({
  providers: [ContaService],
  controllers: [ContaController],
  exports: [ContaService],
})
export class ContaModule {}
