import { Inject, Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { UserService } from '../users/users.service';
import { User } from '../users/schema/users.schema'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    @Inject()
    private readonly userService: UserService
    
    async login (params: SignInDto): Promise<Omit<User, 'password'>>{
        console.log(params)
        const user = await this.userService.findByEmail(params.email)
        if(!user) throw new BadRequestException(`Failed to get user with email ${params.email}`)
        const passwordWatch = await bcrypt.compare(params.password, user.password)
        if(!passwordWatch) throw new UnauthorizedException('Invalid credentials')
        const { password, ...result } = user.toObject()
        return result
    }
}
