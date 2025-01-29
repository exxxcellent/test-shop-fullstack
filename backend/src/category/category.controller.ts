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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.dto';
import { UpdateCategoryDto } from './dto/update.dto';
import { Category } from '@prisma/client';
import { AuthGuard } from '@shared/guards';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
    @Get('')
    public async getMany(): Promise<Category[]> {
        return await this.categoryService.getMany();
    }

    @Get('/:id')
    public async getOneById(@Param('id') id: string): Promise<Category | null> {
        return await this.categoryService.getOneById(id);
    }

    @UseGuards(AuthGuard)
    @Post('')
    public async create(@Body() body: CreateCategoryDto): Promise<Category> {
        return await this.categoryService.create(body);
    }

    @UseGuards(AuthGuard)
    @Put('/:id')
    public async updateOneById(
        @Param('id') id: string,
        @Body() body: UpdateCategoryDto,
    ): Promise<Category> {
        return await this.categoryService.updateOneById(id, body);
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    public async deleteOneById(@Param('id') id: string): Promise<Category> {
        return await this.categoryService.deleteOneById(id);
    }
}
