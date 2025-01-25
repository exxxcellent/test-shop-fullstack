import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserRto } from './dto/createUser.rto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    public async create(@Body() body: CreateUserDto): Promise<CreateUserRto> {
        const user = await this.userService.create(body.email, body.password);
        return new CreateUserRto(user);
    }

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
