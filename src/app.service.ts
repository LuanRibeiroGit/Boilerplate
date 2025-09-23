import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

@Injectable()
export class AppService {
    private readonly startTime = Date.now()
    getHello(): string {
    return 'Hello World!';
    }

    getHealth(): object {
    const uptime = Date.now() - this.startTime;

    return {
        status: 'OK',
        uptime: Math.floor(uptime / 1000), // em segundos
        timestamp: new Date().toISOString(),
        memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100,
        unit: 'MB'
        },
        process: {
        pid: process.pid,
        version: process.version,
        platform: process.platform
        }
    };
    }
}