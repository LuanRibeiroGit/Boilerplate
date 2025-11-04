import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CtaService } from './cta.service';
import { CreateCtaDto } from './dto/create-cta.dto';
import { UpdateCtaDto } from './dto/update-cta.dto';

@Controller('cta')
export class CtaController {
  constructor(private readonly ctaService: CtaService) {}

  @Post()
  create(@Body() createCtaDto: CreateCtaDto) {
    return this.ctaService.create(createCtaDto);
  }

  @Get()
  findAll() {
    return this.ctaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ctaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCtaDto: UpdateCtaDto) {
    return this.ctaService.update(+id, updateCtaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ctaService.remove(+id);
  }
}
