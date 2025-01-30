import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create.dto';
import { Category } from '@prisma/client';
import { UpdateCategoryDto } from './dto/update.dto';
import { EntityError } from '@shared/enums';

@Injectable()
export class CategoryService {
    constructor(private readonly prismaService: PrismaService) {}

    public async getMany(): Promise<Category[]> {
        return await this.prismaService.category.findMany({
            orderBy: {
                popularity: 'desc',
            },
        });
    }

    public async getOneById(id: string): Promise<Category> {
        const category = await this.prismaService.category.findFirst({
            where: {
                id,
            },
        });
        if (!category) {
            throw new BadRequestException(EntityError.NOT_FOUND);
        }
        await this.prismaService.category.update({
            where: {
                id,
            },
            data: {
                popularity: category.popularity + 1,
            },
        });
        return category;
    }

    public async create({
        title,
        popularity,
    }: CreateCategoryDto): Promise<Category> {
        const category = await this.prismaService.category.findUnique({
            where: {
                title,
            },
        });
        if (category) {
            throw new BadRequestException(EntityError.ALREADY_EXISTS);
        }
        return await this.prismaService.category.create({
            data: {
                title,
                popularity,
            },
        });
    }

    public async updateOneById(
        id: string,
        body: UpdateCategoryDto,
    ): Promise<Category> {
        const category = await this.prismaService.category.findUnique({
            where: {
                id,
            },
        });
        if (!category) {
            throw new BadRequestException(EntityError.NOT_FOUND);
        }
        return await this.prismaService.category.update({
            where: {
                id,
            },
            data: {
                ...body,
            },
        });
    }

    public async deleteOneById(id: string): Promise<Category> {
        const category = await this.prismaService.category.findUnique({
            where: {
                id,
            },
        });
        if (!category) {
            throw new BadRequestException(EntityError.NOT_FOUND);
        }
        return await this.prismaService.category.delete({
            where: {
                id,
            },
        });
    }
}
