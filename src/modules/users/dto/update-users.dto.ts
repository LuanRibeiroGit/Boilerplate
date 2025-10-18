import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-users.dto';

class CreateUserDtoWithoutPassword extends OmitType(CreateUserDto, [
    'password',
    'confirmPassword',
] as const) {}

export class UpdateUserDto extends PartialType(CreateUserDtoWithoutPassword) {}
