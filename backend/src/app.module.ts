import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
    imports: [PrismaModule, UserModule, TokenModule, AuthModule, MailModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
