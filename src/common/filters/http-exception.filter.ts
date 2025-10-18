import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Error as MongooseError } from 'mongoose';
import { DiscordService } from 'src/common/interceptors/discord/discord.service'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    constructor(private readonly discordService: DiscordService) {}

    async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<FastifyRequest>();
        const response = ctx.getResponse<FastifyReply>();

        let status: number;
        let message: string | object;
        let error: string;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
        
            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
                error = exception.name;
            } else {
                message = (exceptionResponse as any).message || exceptionResponse;
                error = (exceptionResponse as any).error || exception.name;
            }
        } else if (exception instanceof MongooseError.CastError) {
            status = HttpStatus.BAD_REQUEST;
            message = `The value '${exception.value}' provided for the field '${exception.path}`;
            error = 'Bad Request';

        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Erro interno do servidor';
            error = 'Internal Server Error';
        
        this.logger.error(
            `Erro não tratado: ${exception}`,
            exception instanceof Error ? exception.stack : undefined,
        );
        }

        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            error,
            message,
            ...(process.env.NODE_ENV === 'development' && {
                stack: exception instanceof Error ? exception.stack : undefined,
            }),
        };

        await this.discordService.createEmbed(
            request.method,
            request.url,
            status,
            request.body,
            message,
        )

        this.logger.error(
            `${request.method} ${request.url} - ${status} - ${
                Array.isArray(message) ? message.join(', ') : message
            }`,
        );

        response.status(status).send(errorResponse);
    }
}

