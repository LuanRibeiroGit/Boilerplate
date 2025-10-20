import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { UserService } from '../users/users.service';
import { User } from '../users/schema/users.schema'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    @Inject()
    private readonly userService: UserService
    
    async login (params: SignInDto): Promise<User>{
        console.log(params)
        const user = await this.userService.findByEmail(params.email)
        if(!user) throw new BadRequestException(`Failed to get user with email ${params.email}`)
        return user
    }
}
