import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}
    @Get('')
    public async getMany() {}

    @Get('/:id')
    public async getOneById() {}

    @Post('')
    public async create() {}

    @Put('')
    public async update() {}

    @Delete('/:id')
    public async deleteOneById() {}
}
