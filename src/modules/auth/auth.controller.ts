import { Controller, Get, Post, Body, Res, Req, Patch, Param, Delete, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/signin.dto'


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async validateUser(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: FastifyReply) {
        const { access_token, refresh_token } = await this.authService.signIn(signInDto);
        res.setCookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60, // 7 dias
        });
        console.log(refresh_token)
        return { access_token };
    }

    @Get('sigout/:id')
    async sigOut(@Param('id') userId: string, @Res({ passthrough: true }) res: FastifyReply){
        await this.authService.sigOut(userId, res)
    }

    @Get('new-access-token')
    async newAcessToken (@Req() req: FastifyRequest, @Res({ passthrough: true }) res: FastifyReply) {
        const token = req.cookies['refresh_token'];
        if (!token) throw new UnauthorizedException('Token is required')
        const newToken = await this.authService.newAccessToken(token, res)
        return newToken
    }
}
