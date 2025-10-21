import { Inject, Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { UserService } from '../users/users.service';
import { RefreshTokenDocument, RefreshToken } from './schema/auth.schema'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class AuthService {
    constructor (
        private userService: UserService,
        private jwtService: JwtService,
        @InjectModel(RefreshToken.name)
        private refreshTokenModel: Model<RefreshTokenDocument>
    ) {}
    
    async login (params: SignInDto): Promise<{access_token: string, refresh_token: string}>{
        console.log(params)
        const user = await this.userService.findByEmail(params.email)
        if(!user) throw new BadRequestException(`Failed to get user with email ${params.email}`)
        const passwordWatch = await bcrypt.compare(params.password, user.password)
        if(!passwordWatch) throw new UnauthorizedException('Invalid credentials')
        
        const refreshToken = await this.createRefreshToken(user.id)
        const accessToken = await this.createAccessToken(user.id)
        
        return { access_token: accessToken, refresh_token: refreshToken }
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

        const create = await new this.refreshTokenModel({userId: userId, token: refreshKey}).save()
        console.log(create)
        return refreshKey
    }
}
