import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                from: process.env.MAIL_USER,
                secure: true,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PWD,
                },
            },
            defaults: {
                from: `"Test Shop (Fullstack)" <${process.env.MAIL_USER}>`,
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
