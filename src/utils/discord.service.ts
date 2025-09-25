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

        async createEmbed(method: string, url: string, status: number, body: any, message: any){
            const embed = {
                title: '📡 Nova requisição recebida',
                color: status >= 200 && status < 300 ? 0x00ff00 : 0xff0000,
                fields: [
                    { name: 'Método', value: method, inline: true },
                    { name: 'URL', value: url, inline: true },
                    { name: 'Status', value: status.toString(), inline: true },
                    ...(body?.email ? [{name: '📧 email:', value: body.email, inline: true}] : []),
                    ...(body?.name ? [{name: '🧑 nome', value: body.name, inline: true}] : []),
                    ...(body?.password ? [{name: '🔒 password', value: '******', inline: false}] : []),
                    ...(body?.phone ? [{name: 'phone', value: body.phone, inline: true}] : []),
                    ...(message
                        ? message.length > 1
                            ? message.map((m, i) => ({ name: `Return: ${i + 1}`, value: m.toString(), inline: false }))
                            : [{ name: 'Returno:', value: message.toString(), inline: false }]
                        : []),
                    ],
                    footer: {
                        text: '💬 Vamos ficar ricos até o final do ano.',
                        icon_url: 'https://i.imgur.com/AfFp7pu.png'
                    },
                timestamp: new Date().toISOString(),
            }
            
            await this.sendEmbed(embed)
        }
    }