import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    public async sendActivationLink(to: string, link: string) {
        await this.mailerService.sendMail({
            to,
            subject: `Активация аккаунта на ${process.env.HOST}`,
            html: `
                <h1>Перейдите по ссылке ниже, чтобы активировать аккаунт<h1>
                <a href="${link}">Активировать</a>
            `,
        });
    }
}
