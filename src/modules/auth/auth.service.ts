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
        const { password, ...result } = user.toObject()

        
        return { access_token: await this.createAccessToken(user.id) }
    }

    async createAccessToken (user: string){
        const payload = {
                sub: user
            }
        const accessKey = await this.jwtService.signAsync(payload, {
            secret: process.env.ACCESS_KEY,
            expiresIn: '60s',
        })
        return accessKey
    }
}
