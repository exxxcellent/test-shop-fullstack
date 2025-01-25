import { Exclude } from 'class-transformer';

export class CreateUserRto {
    @Exclude()
    password: string;

    refreshToken: string;
    accessToken: string;

    constructor(partial: Partial<CreateUserRto>) {
        Object.assign(this, partial);
    }
}
