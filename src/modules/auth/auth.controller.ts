import { Controller, Get, Post, Body, Res, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common'
import type { FastifyReply } from 'fastify'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/signin.dto'


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async validateUser(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: FastifyReply) {
        const { access_token, refresh_token } = await this.authService.login(signInDto);
        res.setCookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60, // 7 dias
        });

        return { access_token };
    }
}
