import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Message } from '@shared/enums';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    public async create(
        email: string,
        password: string,
        activationLink: string,
    ): Promise<User> {
        const emailIsExists = await this.getOneByEmail(email);
        if (emailIsExists) {
            throw new BadRequestException(Message.EMAIL_IS_EXISTS);
        }
        return await this.prisma.user.create({
            data: {
                email,
                password,
                activationLink,
            },
        });
    }

    public async getMany(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    public async getOneByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    public async getOneById(id: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    public async deleteOneById(id: string) {
        const userIsExists = await this.getOneById(id);
        if (!userIsExists) throw new BadRequestException(Message.NOT_FOUND);
        const user = await this.prisma.user.delete({
            where: {
                id,
            },
        });
        if (!user) {
            throw new BadRequestException(Message.NOT_DELETED);
        }
        return user;
    }
}
