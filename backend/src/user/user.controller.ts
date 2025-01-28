import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@shared/guards';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    public async getMany() {
        const users = await this.userService.getMany();
        return users;
    }
    @Delete('/:id')
    public async deleteOneById(@Param('id') id: string) {
        const user = await this.userService.deleteOneById(id);
        return user;
    }
}
