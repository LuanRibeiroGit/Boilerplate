import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordService } from './utils/discord.service';
import { DiscordLoggerInterceptor } from './common/interceptors/discord-logger.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { BarberModule } from './barber/barber.module'

@Module({
  imports: [BarberModule],
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
