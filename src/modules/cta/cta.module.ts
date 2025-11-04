import { Module } from '@nestjs/common';
import { CtaService } from './cta.service';
import { CtaController } from './cta.controller';

@Module({
  controllers: [CtaController],
  providers: [CtaService],
})
export class CtaModule {}
