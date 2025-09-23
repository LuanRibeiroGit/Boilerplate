import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordService } from './utils/discord.service';
import { DiscordLoggerInterceptor } from './common/interceptors/discord-logger.interceptor';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    DiscordService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DiscordLoggerInterceptor,
    },
  ],
})
export class AppModule {}
