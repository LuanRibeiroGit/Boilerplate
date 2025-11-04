import { Test, TestingModule } from '@nestjs/testing';
import { CtaController } from './cta.controller';
import { CtaService } from './cta.service';

describe('CtaController', () => {
  let controller: CtaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CtaController],
      providers: [CtaService],
    }).compile();

    controller = module.get<CtaController>(CtaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
