import { Exclude } from 'class-transformer';

export class LogoutUserRto {
    constructor() {
        Object.assign(this, {
            success: true,
            message: 'Logout',
        });
    }
}
