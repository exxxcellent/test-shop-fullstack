import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@shared/guards';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('')
    public async getMany() {
        return await this.userService.getMany();
    }

    @Get('/:id')
    public async getOneById(@Param('id') id: string): Promise<User> {
        return await this.userService.getOneById(id);
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    public async deleteOneById(@Param('id') id: string) {
        return await this.userService.deleteOneById(id);
    }
}
