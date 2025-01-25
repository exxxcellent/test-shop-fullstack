import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    public async create(
        email: string,
        password: string,
        activationLink: string,
    ): Promise<User> {
        const emailIsExists = await this.getUserByEmail(email);
        if (emailIsExists) {
            throw new BadRequestException('Email is exists');
        }
        return await this.prisma.user.create({
            data: {
                email,
                password,
                activationLink,
            },
        });
    }

    public async getAll(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    public async getUserById(id: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    public async deleteById(id: string) {
        const userIsExists = await this.getUserById(id);
        if (!userIsExists) throw new BadRequestException('User does not exist');
        const userIsDeleted = await this.prisma.user.delete({
            where: {
                id,
            },
        });
        if (!userIsDeleted) {
            throw new BadRequestException('User not deleted');
        }
    }
}
