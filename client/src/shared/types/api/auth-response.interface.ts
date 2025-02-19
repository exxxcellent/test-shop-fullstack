import { User } from '@entities/user';

export interface AuthResponseLogin {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface AuthResponseRegister {
    user: User;
    accessToken: string;
    refreshToken: string;
}
