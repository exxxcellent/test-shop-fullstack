import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
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
            where: {
                parentId: null,
            },
            orderBy: {
                popularity: 'desc',
            },
        });
    }

    public async getOneByTitle(title: string): Promise<Category> {
        const category = await this.prismaService.category.findFirst({
            where: {
                title,
            },
        });
        if (!category) throw new NotFoundException(EntityError.NOT_FOUND);
        await this.increasePopularity(category.id, category.popularity);
        return category;
    }

    public async getSubcategoriesByTitle(title: string) {
        await this.getOneByTitle(title);
        return await this.prismaService.category.findMany({
            where: {
                title,
            },
            include: {
                subcategories: true,
            },
        });
    }

    public async getOneById(id: string): Promise<Category> {
        const category = await this.prismaService.category.findFirst({
            where: {
                id,
            },
        });
        if (!category) throw new NotFoundException(EntityError.NOT_FOUND);
        return category;
    }

    public async create({
        title,
        popularity,
        parentId,
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
                parentId,
            },
        });
    }

    public async updateOneById(
        id: string,
        body: UpdateCategoryDto,
    ): Promise<Category> {
        await this.getOneById(id);
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
        await this.getOneById(id);
        return await this.prismaService.category.delete({
            where: {
                id,
            },
        });
    }

    public async increasePopularity(id: string, popularity: number) {
        await this.updateOneById(id, { popularity: popularity + 1 });
    }
}
