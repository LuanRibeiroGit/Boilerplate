import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { config } from 'dotenv'

config()

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    )

    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })

    app.useGlobalPipes(
        new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
        }),
    )

    app.useGlobalFilters(new HttpExceptionFilter())

    const config = new DocumentBuilder()
        .setTitle('Boilerplate')
        .setDescription('API desenvolvida com NestJS, Fastify e TypeScript usando arquitetura OOP')
        .setVersion('1.0')
        .addTag('auth', 'Endpoints de autenticação')
        .addTag('users', 'Endpoints de usuários')
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
        persistAuthorization: true,
        },
    })

    const port = process.env.PORT || 3000
    const host = process.env.HOST || '0.0.0.0'
    
    await app.listen(port, host)
    
    console.log(`🚀 Aplicação rodando em: http://${host}:${port}`)
    console.log(`📚 Documentação Swagger: http://${host}:${port}/api/docs`)
}

bootstrap().catch((error) => {
    console.error('Erro ao inicializar aplicação:', error)
    process.exit(1)
})
