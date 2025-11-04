import { IsString, IsEmail } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'

export class CreateCtaDto {

    @ApiProperty({
        description: 'Nome',
        example: 'João...',
        format: 'string'
    })
    @IsString({})
    name: string

    @ApiProperty({
        description: 'Email do usuário',
        example: 'Exemplo@newdawn.com',
        format: 'email'
    })
    @IsEmail({}, { message: 'Digite o e-mail com o formato correto. Ex...: Exemplo@newdawn.com' })
    email: string

    @ApiProperty({
        description: 'Nome da Empresa',
        example: 'New Dawn...',
        format: 'string'
    })
    @IsString({})
    company: string

    @ApiProperty({
        description: 'Por que você quer participar?',
        example: 'Quero participar porque minha empresa possui uma alta taxa de conversão em vendas....',
        format: 'string'
    })
    @IsString({})
    intention: string
}
