import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthError, EntityError } from '@shared/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    public async create(
        email: string,
        loginLink: string | null,
    ): Promise<User> {
        const user = await this.getOneByEmail(email);
        if (user) {
            throw new BadRequestException(AuthError.EMAIL_IS_EXISTS);
        }
        return await this.prisma.user.create({
            data: {
                email,
                loginLink,
            },
        });
    }

    public async getMany(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    public async getOneByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }

    public async getOneByLoginLink(loginLink: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {
                loginLink,
            },
        });
        return user;
    }

    public async getOneById(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) throw new NotFoundException(EntityError.NOT_FOUND);
        return user;
    }

    public async getOneByRefresh(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) throw new NotFoundException(EntityError.NOT_FOUND);
        return user;
    }

    public async deleteOneById(id: string): Promise<User> {
        await this.getOneById(id);
        const deletedUser = await this.prisma.user.delete({
            where: {
                id,
            },
        });
        if (!deletedUser) {
            throw new BadRequestException(EntityError.NOT_DELETED);
        }
        return deletedUser;
    }

    public async updateOneById(id: string, body: UpdateUserDto): Promise<User> {
        await this.getOneById(id);
        const updatedUser = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                ...body,
            },
        });
        if (!updatedUser) {
            throw new BadRequestException(EntityError.NOT_UPDATED);
        }
        return updatedUser;
    }
}
