import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginUserRto } from './rto/login.rto';
import { LoginUserDto } from './dto/login.dto';
import { LogoutUserRto } from './rto/logout.rto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    public async login(
        @Body() loginUserDto: LoginUserDto,
        @Res() res: Response,
    ) {
        const user = await this.authService.login(loginUserDto.email);
        res.cookie('refreshToken', user.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        res.json(new LoginUserRto(user));
        res.end();
    }

    @Get('login/:link')
    public async activate(@Param('link') link: string, @Res() res: Response) {
        const user = await this.authService.activate(
            `${process.env.HOST}/auth/login/${link}`,
        );
        res.redirect(
            `${process.env.CLIENT_HOST}/auth/login?id=${user.id}` as string,
        );
        res.end();
    }

    @Get('logout')
    public async logout(@Req() req: Request, @Res() res: Response) {
        const { refreshToken } = req.cookies;
        await this.authService.logout(refreshToken);
        res.clearCookie('refreshToken');
        res.json(new LogoutUserRto());
        res.end();
    }

    @Get('refresh')
    public async refresh(@Req() req: Request, @Res() res: Response) {
        const { refreshToken } = req.cookies;
        const user = await this.authService.refresh(refreshToken);
        res.cookie('refreshToken', user.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: false,
        });
        res.json(new LoginUserRto(user));
        res.end();
    }
}
