import { Exclude } from 'class-transformer';

export class LoginUserRto {
    @Exclude()
    password: string;

    refreshToken: string;
    accessToken: string;

    constructor(partial: Partial<LoginUserRto>) {
        Object.assign(this, {
            success: true,
            data: partial,
        });
    }
}
