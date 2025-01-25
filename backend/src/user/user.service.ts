import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    public async create(email: string, password: string): Promise<Boolean> {
        try {
            await this.prisma.user.create({
                data: {
                    email,
                    password,
                },
            });
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    public async getAll() {
        try {
            return await this.prisma.user.findMany();
        } catch (error) {
            console.error(error);
            return;
        }
    }

    public async deleteById(id: string): Promise<Boolean> {
        try {
            await this.prisma.user.delete({
                where: {
                    id,
                },
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
