import { IsString, IsEmail } from "class-validator";

export class CreateCtaDto {
    @IsString({})
    name: string

    @IsEmail({}, { message: 'Digite o e-mail com o formato correto. Ex...: Exemplo@newdawn.com' })
    email: string

    @IsString({})
    company: string

    @IsString({})
    intention: string
}
