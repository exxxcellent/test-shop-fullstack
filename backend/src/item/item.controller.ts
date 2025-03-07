import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create.dto';
import { AuthGuard } from '@shared/guards';
import { Item } from '@prisma/client';
import { UpdateItemDto } from './dto/update.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}
    @Get('')
    public async getMany(): Promise<Item[]> {
        return await this.itemService.getMany();
    }

    @Get('/:categoryTitle/items')
    public async getManyByCategoryTitle(
        @Param('categoryTitle') categoryTitle: string,
    ): Promise<Item[]> {
        return await this.itemService.getManyByCategoryTitle(categoryTitle);
    }

    @Get('/:id')
    public async getOneById(@Param('id') id: string): Promise<Item> {
        return await this.itemService.getOneById(id);
    }

    @UseGuards(AuthGuard)
    @Post('')
    @UseInterceptors(FileInterceptor('image'))
    public async create(
        @Body() body: any,
        @UploadedFile() image: Express.Multer.File,
    ): Promise<Item> {
        return await this.itemService.create(body, image);
    }

    @UseGuards(AuthGuard)
    @Put('/:id')
    public async update(
        @Param('id') id: string,
        @Body() body: UpdateItemDto,
    ): Promise<Item> {
        return await this.itemService.updateOneById(id, body);
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    public async deleteOneById(@Param('id') id: string): Promise<Item> {
        return await this.itemService.deleteOneById(id);
    }
}
