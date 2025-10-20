import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/signin.dto'


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Post('signin')
    async validateUser(@Body() signInDto: SignInDto){
        return await this.authService.login(signInDto)
    }
}
