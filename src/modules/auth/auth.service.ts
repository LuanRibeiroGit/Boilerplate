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

        const payload = {
                sub: user.id
            }
        console.log(payload)
        const accessKey = await this.jwtService.signAsync(payload)

        
        return { access_token: accessKey }
    }
}
