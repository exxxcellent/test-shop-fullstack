import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { UuidService } from 'nestjs-uuid';
import { AuthError, EntityError } from '@shared/enums';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly mailService: MailService,
        private readonly uuidService: UuidService,
    ) {}

    private async generateLoginLink(): Promise<string> {
        return `${process.env.HOST}/auth/login/${this.uuidService.generate({ version: 4 })}`;
    }

    private async generateTokens(
        email: string,
        userId: string,
    ): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        const { accessToken, refreshToken } = this.tokenService.generateTokens({
            email,
        });
        await this.tokenService.saveToken(userId, refreshToken);
        return { accessToken, refreshToken };
    }

    public async register(email: string): Promise<{
        user: User;
        accessToken: string;
        refreshToken: string;
    }> {
        const loginLink = await this.generateLoginLink();
        const user = await this.userService.create(email, loginLink);
        const { accessToken, refreshToken } = await this.generateTokens(
            email,
            user.id,
        );
        await this.mailService.sendLoginLink(email, loginLink);
        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    public async login(email: string) {
        const user = await this.userService.getOneByEmail(email);
        if (!user) {
            const registeredUser = await this.register(email);
            return registeredUser;
        }
        const { accessToken, refreshToken } = await this.generateTokens(
            email,
            user.id,
        );
        if (user.loginLink) {
            await this.mailService.sendLoginLink(email, user.loginLink);
            return {
                user,
                accessToken,
                refreshToken,
            };
        }
        if (user.isLogin) {
            return {
                user,
                accessToken,
                refreshToken,
            };
        }
        const loginLink = await this.generateLoginLink();
        const updatedUser = await this.userService.updateOneById(user.id, {
            loginLink,
        });
        await this.mailService.sendLoginLink(email, loginLink);
        return {
            user: updatedUser,
            accessToken,
            refreshToken,
        };
    }

    public async logout(refreshToken: string) {
        const token = await this.tokenService.findToken(refreshToken);
        if (!token) throw new NotFoundException(EntityError.NOT_FOUND);
        await this.tokenService.deleteToken(refreshToken);
        const user = await this.userService.getOneById(token.userId);
        const loginLink = await this.generateLoginLink();
        await this.userService.updateOneById(user.id, {
            loginLink,
        });
    }

    public async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException(AuthError.AUTH_REQUIRED);
        }
        const tokenIsValid =
            this.tokenService.validateRefreshToken(refreshToken);
        const tokenInDb = await this.tokenService.findToken(refreshToken);
        if (!tokenIsValid || !tokenInDb) {
            throw new UnauthorizedException(AuthError.ACTIVATION_FAILED);
        }
        const user = await this.userService.getOneById(tokenInDb.userId);
        if (!user) {
            throw new UnauthorizedException(AuthError.AUTH_REQUIRED);
        }
        const tokens = await this.generateTokens(user.email, user.id);
        return {
            user,
            ...tokens,
        };
    }

    public async activate(loginLink: string): Promise<User> {
        const user = await this.userService.getOneByLoginLink(loginLink);
        if (!user) {
            throw new BadRequestException(AuthError.ACTIVATION_FAILED);
        }
        await this.userService.updateOneById(user.id, {
            loginLink: '',
            isLogin: true,
        });
        return user;
    }
}
