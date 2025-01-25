import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
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
}
