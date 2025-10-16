import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { Observable, tap } from 'rxjs';
import { DiscordService } from './discord.service';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class DiscordLoggerInterceptor implements NestInterceptor {
    constructor(private readonly discordService: DiscordService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest<FastifyRequest>();
        const res = context.switchToHttp().getResponse<FastifyReply>();
        return next.handle().pipe(
            tap((response) => {
                this.discordService.createEmbed(req.method, req.url, res.statusCode, req.body, [response]);
            }),
        );
    }
}
