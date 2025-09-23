import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios'

@Injectable()
    export class DiscordService {
        private readonly logger = new Logger(DiscordService.name)
        private readonly webhookUrl = process.env.DISCORD_WEBHOOK_URL

        async sendEmbed(embed: any){
            if (!this.webhookUrl) {
                this.logger.error('Webhook do Discord não configurado.')
                return
            }

            try {
                await axios.post(this.webhookUrl, {
                    embeds: [embed],
                })
            } catch (err) {
                this.logger.error('Erro ao enviar a mensagem para o Discord.')
            }
        }

        async createEmbed(method: string, url: string, status: number){
            const embed = {
                title: '📡 Nova requisição recebida',
                color: status >= 200 && status < 300 ? 0x00ff00 : 0xff0000,
                fields: [
                    { name: 'Método', value: method, inline: true },
                    { name: 'URL', value: url, inline: true },
                    { name: 'Status', value: status.toString(), inline: true },
                ],
                timestamp: new Date().toISOString(),
            }
            
            await this.sendEmbed(embed)
        }
    }