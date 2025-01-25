import { Exclude } from 'class-transformer';

export class CreateUserRto {
    @Exclude()
    id: string;

    @Exclude()
    password: string;

    constructor(partial: Partial<CreateUserRto>) {
        Object.assign(this, partial);
    }
}
