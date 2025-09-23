import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost): void {
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
        } else {
        // Erro não tratado
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Erro interno do servidor';
        error = 'Internal Server Error';
        
        // Log do erro completo para debugging
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

        // Log da requisição que causou erro
        this.logger.error(
        `${request.method} ${request.url} - ${status} - ${
            Array.isArray(message) ? message.join(', ') : message
        }`,
        );

        response.status(status).send(errorResponse);
    }
}

