import { Inject, Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { UserService } from '../users/users.service';
import { User } from '../users/schema/users.schema'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (
        private userService: UserService,
        private jwtService: JwtService
    ) {}
    
    async login (params: SignInDto): Promise<{access_token: string}>{
        console.log(params)
        const user = await this.userService.findByEmail(params.email)
        if(!user) throw new BadRequestException(`Failed to get user with email ${params.email}`)
        const passwordWatch = await bcrypt.compare(params.password, user.password)
        if(!passwordWatch) throw new UnauthorizedException('Invalid credentials')
        
        const refreshToken = await this.createRefreshToken(user.id)
        const accessToken = await this.createAccessToken(user.id)
        
        return { access_token: accessToken }
    }

    async createAccessToken (userId: string){
        const payload = {
            sub: userId
        }
        const accessKey = await this.jwtService.signAsync(payload, {
            secret: process.env.ACCESS_KEY,
            expiresIn: '60s',
        })
        return accessKey
    }

    async createRefreshToken (userId: string){
        const payload = {
            sub: userId
        }
        const refreshKey = await this.jwtService.signAsync(payload, {
            secret: process.env.REFRESH_KEY,
            expiresIn: '60s',
        })

        return refreshKey
    }
}
