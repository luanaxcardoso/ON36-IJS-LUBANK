
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ViaCepService } from '../application/services/viacep.service';

@Module({
  imports: [HttpModule],
  providers: [ViaCepService],
  exports: [ViaCepService],
})
export class ViaCepModule {}