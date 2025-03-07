import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from '@prisma/client';
import { UpdateItemDto } from './dto/update.dto';
import { EntityError } from '@shared/enums';
import { CategoryService } from 'src/category/category.service';
import { UuidService } from 'nestjs-uuid';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ItemService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly categoryService: CategoryService,
        private readonly uuidService: UuidService,
        private readonly fileService: FilesService,
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

    public async create(
        body: CreateItemDto,
        file: Express.Multer.File,
    ): Promise<Item> {
        const imageKey = `${process.env.S3_FOLDER}/${this.uuidService.generate({ version: 4 })}_${file.originalname}`;
        const url = await this.fileService.upload(imageKey, file);
        return await this.prismaService.item.create({
            data: {
                ...body,
                price: +body.price,
                imageUrl: url,
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
