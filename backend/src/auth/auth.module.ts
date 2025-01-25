import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';
import { MailModule } from 'src/mail/mail.module';
import { UuidModule } from 'nestjs-uuid';

@Module({
    imports: [PrismaModule, UserModule, TokenModule, MailModule, UuidModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
