import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

@ApiTags('App')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('health')
    @ApiOperation({ summary: 'Verificação da saúde da aplicação'})
    @ApiResponse({
        status: 200, 
        description: 'Status de saúde da aplicação',
        schema: {
        type: 'object',
        properties: {
            status: { type: 'string' },
            uptime: { type: 'number' },
            timestamp: { type: 'string' }
        }
        }
    })
    getHealth(): object {
        return this.appService.getHealth()
    }

    @Get('error')
    getError() {
        throw new ConflictException('Erro lançado manualmente');
    }
}
