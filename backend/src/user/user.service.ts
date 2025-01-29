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
        password: string,
        activationLink: string,
    ): Promise<User> {
        const user = await this.getOneByEmail(email);
        if (user) {
            throw new BadRequestException(AuthError.EMAIL_IS_EXISTS);
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

    public async getOneByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) throw new NotFoundException(EntityError.NOT_FOUND);
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

    public async deleteOneById(id: string): Promise<User> {
        const userIsExists = await this.getOneById(id);
        if (!userIsExists) throw new BadRequestException(EntityError.NOT_FOUND);
        const user = await this.prisma.user.delete({
            where: {
                id,
            },
        });
        if (!user) {
            throw new BadRequestException(EntityError.NOT_DELETED);
        }
        return user;
    }

    public async updateOneById(id: string, body: UpdateUserDto): Promise<User> {
        const user = await this.getOneById(id);
        if (!user) throw new BadRequestException(EntityError.NOT_FOUND);
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
