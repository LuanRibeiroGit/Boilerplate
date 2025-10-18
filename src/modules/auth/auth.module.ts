import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from '../users/users.module'

@Module({
  imports: [
      UserModule,
    ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
