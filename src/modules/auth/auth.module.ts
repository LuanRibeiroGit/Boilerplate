import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
      UserModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          global: true,
          secret: config.get<string>('ACCESS_KEY'),
          signOptions: { expiresIn: '60s' },
        }),
      }),
    ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
