import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { createUserDto } from 'src/common/dto/createUserDto';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    public async create(@Body() body: createUserDto, @Res() res: Response) {
        const userIsCreated = await this.userService.create(
            body.email,
            body.password,
        );
        if (!userIsCreated) {
            throw new BadRequestException('User is not created');
        }
        res.json('User created');
        res.end();
    }

    @Get()
    public async getAll() {
        const users = this.userService.getAll();

        if (!users) {
            throw new BadRequestException('Users error');
        }
        return users;
    }

    @Delete('/:id')
    public async deleteById(@Param('id') id: string, @Res() res: Response) {
        const userIsDeleted = await this.userService.deleteById(id);
        if (!userIsDeleted) {
            throw new BadRequestException('User is not deleted');
        }
        res.json('User deleted');
        res.end();
    }
}
