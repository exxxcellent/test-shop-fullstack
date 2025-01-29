import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UuidService } from 'nestjs-uuid';
import { AuthError, EntityError } from '@shared/enums';

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
        const activationLink = `${process.env.HOST}/auth/activate/${this.uuidService.generate({ version: 4 })}`;
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

    public async login(email: string, password: string) {
        const user = await this.prismaService.user.findFirst({
            where: {
                email,
            },
        });
        if (!user) {
            throw new NotFoundException(EntityError.NOT_FOUND);
        }
        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if (!isPasswordEquals) {
            throw new BadRequestException(AuthError.WRONG_PASSWORD);
        }
        const { accessToken, refreshToken } = this.tokenService.generateTokens({
            email,
        });
        await this.tokenService.saveToken(user.id, refreshToken);
        return {
            accessToken,
            refreshToken,
        };
    }

    public async logout(refreshToken: string) {
        await this.tokenService.deleteToken(refreshToken);
    }

    public async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException(AuthError.AUTH_REQUIRED);
        }
        const tokenIsValid =
            this.tokenService.validateRefreshToken(refreshToken);
        const tokenInDb = await this.tokenService.findToken(refreshToken);
        if (!tokenIsValid || !tokenInDb) {
            throw new UnauthorizedException(AuthError.AUTH_REQUIRED);
        }
        const user = await this.userService.getOneById(tokenInDb.userId);
        if (!user) {
            throw new UnauthorizedException(AuthError.AUTH_REQUIRED);
        }
        const tokens = this.tokenService.generateTokens({
            email: user.email,
        });
        await this.tokenService.saveToken(user.id, refreshToken);
        return {
            user,
            ...tokens,
        };
    }

    public async activate(activationLink: string) {
        const user = await this.prismaService.user.findFirst({
            where: {
                activationLink,
            },
        });
        if (!user) {
            throw new BadRequestException(AuthError.ACTIVATION_FAILED);
        }
        await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: {
                isActivated: true,
                activationLink: '',
            },
        });
    }
}
