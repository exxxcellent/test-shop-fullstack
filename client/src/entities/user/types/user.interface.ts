import { UserRole } from '@shared/types';

export interface User {
    id: string;
    email: string;
    createdAt: Date;
    role: UserRole;
    isActivated: boolean;
    activationLink: string;
    balance: number;
}
