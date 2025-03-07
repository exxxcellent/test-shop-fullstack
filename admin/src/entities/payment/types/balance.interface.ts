import { BalancePaymentMethod, BalanceStatus } from '@shared/types';

export interface Balance {
    id: string;
    userId: string;
    sum: number;
    status: BalanceStatus;
    paymentMethod: BalancePaymentMethod;
    createdAt: Date;
    updatedAt: Date;
}
