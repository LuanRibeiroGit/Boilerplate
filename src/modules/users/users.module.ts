import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from './users.controller'
import { User, UserSchema } from './schema/users.schema'
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule,
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  
})
export class UserModule {}
