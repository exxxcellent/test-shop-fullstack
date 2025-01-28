import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService,
    ) {}

    public generateTokens(payload: Pick<User, 'email'>): {
        accessToken: string;
        refreshToken: string;
    } {
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
        });
        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId: string, refreshToken: string) {
        await this.prismaService.token.create({
            data: {
                userId,
                refreshToken,
            },
        });
    }

    public validateAccessToken(token: string) {
        const tokenIsValid = this.jwtService.verify(token, {
            secret: process.env.JWT_ACCESS_SECRET,
        });
        return tokenIsValid;
    }

    public validateRefreshToken(token: string) {
        const tokenIsValid = this.jwtService.verify(token, {
            secret: process.env.JWT_REFRESH_SECRET,
        });
        return tokenIsValid;
    }

    public async deleteToken(refreshToken: string) {
        await this.prismaService.token.deleteMany({
            where: {
                refreshToken,
            },
        });
    }

    public async findToken(refreshToken: string) {
        return await this.prismaService.token.findFirst({
            where: {
                refreshToken,
            },
        });
    }
}
