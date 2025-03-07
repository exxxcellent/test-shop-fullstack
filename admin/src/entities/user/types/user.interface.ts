import { UserRole } from '@shared/types';

export interface User {
    id: string;
    email: string;
    role: UserRole;
    isActivated: boolean;
    loginLink: string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
}
