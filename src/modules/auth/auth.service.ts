import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}
    async login (data: LoginDto): Promise<any>{
        console.log(data)
        return null
    }
}
