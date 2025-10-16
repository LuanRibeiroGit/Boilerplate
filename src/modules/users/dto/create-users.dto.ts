import { IsEmail, IsNotEmpty, IsString, isString, IsStrongPassword } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({
        description: 'Email do usuário',
        example: 'Exemplo@newdawn.com',
        format: 'email'
    })
    @IsNotEmpty()
    @IsEmail({}, { message: 'Digite o e-mail com o formato correto. Ex...: Exemplo@newdawn.com' })
    email: string

    @ApiProperty({
        description: 'Senha do usuário',
        example: 'Exemplo@123',
        format: 'pass'
    })
    @IsNotEmpty()
    @IsStrongPassword({}, { message: 'A senha deve ser forte' })
    password: string

    @ApiProperty({
        description: 'Confirmação da senha do usuário',
        format: 'pass'
    })
    @IsNotEmpty()
    @IsStrongPassword({}, { message: 'A confirmação da senha não confere' })
    confirmPassword: string

    @ApiProperty({
        description: 'Nome',
        example: 'João...',
        format: 'string'
    })
    @IsNotEmpty()
    @IsString()
    name: string
}
