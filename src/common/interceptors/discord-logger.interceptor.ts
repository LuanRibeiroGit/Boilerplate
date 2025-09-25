import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { Observable, tap } from 'rxjs';
import { DiscordService } from '../../utils/discord.service';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class DiscordLoggerInterceptor implements NestInterceptor {
    constructor(private readonly discordService: DiscordService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest<FastifyRequest>();
        const res = context.switchToHttp().getResponse<FastifyReply>();
        console.log(req.body)
        return next.handle().pipe(
            tap((response) => {
                console.log(response)
                this.discordService.createEmbed(req.method, req.url, res.statusCode, req.body, [response]);
            }),
        );
    }
}
