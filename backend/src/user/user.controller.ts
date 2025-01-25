import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    public async getAll() {
        const users = await this.userService.getAll();
        return users;
    }

    @Delete('/:id')
    public async deleteById(@Param('id') id: string) {
        await this.userService.deleteById(id);
        return 'User is deleted';
    }
}
