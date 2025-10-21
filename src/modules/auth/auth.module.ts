import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './guard/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from './schema/auth.schema';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }]),
      forwardRef(() => UserModule),
      JwtModule.register({
        global: true,
      }),
    ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard ],
  exports: [AuthService, AuthGuard]
})
export class AuthModule {}
