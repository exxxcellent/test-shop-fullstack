import { BadRequestException, Injectable } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UuidService } from 'nestjs-uuid';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly mailService: MailService,
        private readonly prismaService: PrismaService,
        private readonly uuidService: UuidService,
    ) {}

    public async register(
        email: string,
        password: string,
    ): Promise<{
        user: User;
        accessToken: string;
        refreshToken: string;
    }> {
        const salt =
            Number(process.env.PASSWORD_SALT) ?? (await bcrypt.genSalt());
        const hashPassword = await bcrypt.hash(password, salt);
        const { accessToken, refreshToken } = this.tokenService.generateTokens({
            email,
        });
        const activationLink = `${process.env.HOST}:${process.env.PORT}/auth/activate/${this.uuidService.generate({ version: 4 })}`;
        const user = await this.userService.create(
            email,
            hashPassword,
            activationLink,
        );
        await this.tokenService.saveToken(user.id, refreshToken);
        await this.mailService.sendActivationLink(email, activationLink);
        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    public async activate(activationLink: string) {
        const user = await this.prismaService.user.findFirst({
            where: {
                activationLink,
            },
        });
        if (!user) {
            throw new BadRequestException('Activation of the account failed');
        }
        await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: {
                isActivated: true,
            },
        });
    }
}
