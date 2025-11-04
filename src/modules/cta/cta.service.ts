import { Injectable } from '@nestjs/common';
import { CreateCtaDto } from './dto/create-cta.dto';
import { UpdateCtaDto } from './dto/update-cta.dto';

@Injectable()
export class CtaService {
  create(createCtaDto: CreateCtaDto) {
    return 'This action adds a new cta';
  }

  findAll() {
    return `This action returns all cta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cta`;
  }

  update(id: number, updateCtaDto: UpdateCtaDto) {
    return `This action updates a #${id} cta`;
  }

  remove(id: number) {
    return `This action removes a #${id} cta`;
  }
}
