import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create.dto';
import { AuthGuard } from '@shared/guards';
import { Item } from '@prisma/client';
import { UpdateItemDto } from './dto/update.dto';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}
    @Get('')
    public async getMany(): Promise<Item[]> {
        return await this.itemService.getMany();
    }

    @Get('/:id')
    public async getOneById(@Param('id') id: string) {
        return await this.itemService.getOneById(id);
    }

    @UseGuards(AuthGuard)
    @Post('')
    public async create(@Body() body: CreateItemDto) {
        return await this.itemService.create(body);
    }

    @UseGuards(AuthGuard)
    @Put('/:id')
    public async update(@Param('id') id: string, @Body() body: UpdateItemDto) {
        return await this.itemService.updateOneById(id, body);
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    public async deleteOneById(@Param('id') id: string) {
        return await this.itemService.deleteOneById(id);
    }
}
