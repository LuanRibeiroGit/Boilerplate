import { PartialType } from '@nestjs/swagger';
import { CreateCtaDto } from './create-cta.dto';

export class UpdateCtaDto extends PartialType(CreateCtaDto) {}
