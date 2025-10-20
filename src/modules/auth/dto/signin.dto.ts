import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignInDto {
    @IsEmail({}, { message: 'Por favor, forneça um endereço de email válido.' })
    @IsNotEmpty({ message: 'O campo de email não pode estar vazio.' })
    email: string

    @IsString({ message: 'A senha deve ser uma string.' })
    @IsNotEmpty({ message: 'O campo de senha não pode estar vazio.' })
    @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
    password: string
}
