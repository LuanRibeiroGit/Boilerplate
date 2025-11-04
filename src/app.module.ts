import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordService } from './common/interceptors/discord/discord.service';
import { DiscordLoggerInterceptor } from './common/interceptors/discord/discord-logger.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { UserModule } from './modules/users/users.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module';
import { CtaModule } from './modules/cta/cta.module';

@Module({
  imports: [
      UserModule,
      ConfigModule.forRoot({ isGlobal: true }),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          uri: configService.get<string>('MONGODB_URI'),
        }),
        inject: [ConfigService],
    }),
      AuthModule,
      CtaModule,
    ],
  controllers: [AppController],
  providers: [
    AppService,
    DiscordService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DiscordLoggerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
