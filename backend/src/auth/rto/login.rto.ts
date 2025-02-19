import { User } from '@prisma/client';

export class LoginUserRto {
    user: User;

    refreshToken: string;
    accessToken: string;

    constructor(partial: Partial<LoginUserRto>) {
        Object.assign(this, {
            success: true,
            data: partial,
        });
    }
}
