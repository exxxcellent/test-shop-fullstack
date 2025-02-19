import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from '@prisma/client';
import { UpdateItemDto } from './dto/update.dto';
import { EntityError } from '@shared/enums';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ItemService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly categoryService: CategoryService,
    ) {}

    public async getMany(): Promise<Item[]> {
        return await this.prismaService.item.findMany();
    }

    public async getManyByCategoryTitle(
        categoryTitle: string,
    ): Promise<Item[]> {
        const category =
            await this.categoryService.getOneByTitle(categoryTitle);
        if (!category) {
            throw new NotFoundException(EntityError.NOT_FOUND);
        }
        return await this.prismaService.item.findMany({
            where: {
                categoryId: category.id,
            },
        });
    }

    public async getOneById(id: string): Promise<Item> {
        const item = await this.prismaService.item.findFirst({
            where: {
                id,
            },
        });
        if (!item) {
            throw new NotFoundException(EntityError.NOT_FOUND);
        }
        return item;
    }

    public async create({
        title,
        description,
        price,
        amount,
        categoryId,
        imageUrl,
    }: CreateItemDto): Promise<Item> {
        return await this.prismaService.item.create({
            data: {
                title,
                description,
                price,
                amount,
                categoryId,
                imageUrl,
            },
        });
    }

    public async updateOneById(id: string, body: UpdateItemDto): Promise<Item> {
        await this.getOneById(id);
        return await this.prismaService.item.update({
            where: {
                id,
            },
            data: {
                ...body,
            },
        });
    }

    public async deleteOneById(id: string): Promise<Item> {
        await this.getOneById(id);
        return await this.prismaService.item.delete({
            where: {
                id,
            },
        });
    }

    public async decreaseAmount(id: string) {
        const item = await this.getOneById(id);
        await this.updateOneById(id, {
            amount: item.amount - 1,
        });
    }

    public async increaseAmount(id: string) {
        const item = await this.getOneById(id);
        await this.updateOneById(id, {
            amount: item.amount + 1,
        });
    }
}
