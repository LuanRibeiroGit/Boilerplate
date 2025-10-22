import { Inject, Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { UserService } from '../users/users.service';
import { RefreshTokenDocument, RefreshToken } from './schema/auth.schema'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import type { FastifyReply } from 'fastify'

@Injectable()
export class AuthService {
    constructor (
        private userService: UserService,
        private jwtService: JwtService,
        @InjectModel(RefreshToken.name)
        private refreshTokenModel: Model<RefreshTokenDocument>
    ) {}
    
    async signIn (params: SignInDto): Promise<{access_token: string, refresh_token: string}>{
        const user = await this.userService.findByEmail(params.email)
        if(!user) throw new BadRequestException(`Failed to get user with email ${params.email}`)
        const passwordWatch = await bcrypt.compare(params.password, user.password)
        if(!passwordWatch) throw new UnauthorizedException('Invalid credentials')
        
        const refreshToken = await this.createRefreshToken(user.id)
        const accessToken = await this.createAccessToken(user.id)
        
        return { access_token: accessToken, refresh_token: refreshToken }
    }

    async sigOut(userId: string, res: FastifyReply){
        const sigout = await this.refreshTokenModel.deleteMany({ userId }).exec()
        if (!sigout) {
            throw new NotFoundException(`User with ID "${userId}" not found`)
        }
        res.clearCookie('refresh_token', { path: '/' })
    }

    async createAccessToken (userId: string):Promise<string>{
        const payload = {
            sub: userId
        }
        const accessKey = await this.jwtService.signAsync(payload, {
            secret: process.env.ACCESS_KEY,
            expiresIn: '2h',
        })
        return accessKey
    }

    async createRefreshToken (userId: string):Promise<string>{
        const payload = {
            sub: userId
        }
        const refreshKey = await this.jwtService.signAsync(payload, {
            secret: process.env.REFRESH_KEY,
            expiresIn: '7d',
        })

        await new this.refreshTokenModel({userId: userId, token: refreshKey}).save()
        return refreshKey
    }

    async newAccessToken(token: string, res: FastifyReply):Promise<{ access_token: string }>{
        const refreshStored = await this.refreshTokenModel.findOne({ token })
        if(!refreshStored)throw new UnauthorizedException('Invalid Token')

        try {
            const payload = await this.jwtService.verifyAsync(refreshStored.token, { secret: process.env.REFRESH_KEY })
            const newAccessToken = await this.createAccessToken(payload.sub)
            return { access_token: newAccessToken }
        } catch {
            await this.refreshTokenModel.deleteOne({ token })
            res.clearCookie('refresh_token', { path: '/' })
            throw new UnauthorizedException('Token is expired');
        }
    }
}
