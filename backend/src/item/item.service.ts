import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from '@prisma/client';
import { UpdateItemDto } from './dto/update.dto';
import { EntityError } from '@shared/enums';

@Injectable()
export class ItemService {
    constructor(private readonly prismaService: PrismaService) {}

    public async getMany(): Promise<Item[]> {
        return await this.prismaService.item.findMany();
    }

    public async getOneById(id: string): Promise<Item> {
        const item = await this.prismaService.item.findFirst({
            where: {
                id,
            },
        });
        if (!item) {
            throw new BadRequestException(EntityError.NOT_FOUND);
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
}
