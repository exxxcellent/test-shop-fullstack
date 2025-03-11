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
import { UserService } from './user.service';
import { AuthGuard, RolesGuard } from '@shared/guards';
import { User, UserRole } from '@prisma/client';
import { UpdateUserDto } from './dto/update.dto';
import { Roles } from '@shared/decorators';

@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('')
    public async getMany(): Promise<User[]> {
        return await this.userService.getMany();
    }

    @Get('/:id')
    public async getOneById(@Param('id') id: string): Promise<User> {
        return await this.userService.getOneById(id);
    }

    @Post('')
    public async create(@Body('email') email: string): Promise<User> {
        return await this.userService.create(email, null);
    }

    @UseGuards(AuthGuard)
    @Put('/:id')
    public async updateOneById(
        @Param('id') id: string,
        @Body() body: UpdateUserDto,
    ): Promise<User> {
        return await this.userService.updateOneById(id, body);
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    public async deleteOneById(@Param('id') id: string): Promise<User> {
        return await this.userService.deleteOneById(id);
    }
}
