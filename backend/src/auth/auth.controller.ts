import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.dto';
import { CreateUserRto } from './rto/create.rto';
import { Response } from 'express';
import { link } from 'fs';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    public async login(@Body() body) {}

    @Post('register')
    public async register(
        @Body() { email, password }: CreateUserDto,
        @Res() res: Response,
    ) {
        const user = await this.authService.register(email, password);
        res.cookie('refreshToken', user.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        res.json(new CreateUserRto(user));
        res.end();
    }

    @Get('activate/:link')
    public async activate(@Param('link') link: string) {
        await this.authService.activate(
            `${process.env.HOST}:${process.env.PORT}/auth/activate/${link}`,
        );
        return '<h1>Аккаунт активирован</h1>';
    }

    public async logout() {}

    public async refresh() {}
}
