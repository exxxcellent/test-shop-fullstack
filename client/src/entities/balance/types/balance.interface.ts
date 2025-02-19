import { BalancePaymentMethod, BalanceStatus } from '@shared/types';

export interface Balance {
    id: string;
    userId: string;
    sum: number;
    createdAt: Date;
    status: BalanceStatus;
    paymentMethod: BalancePaymentMethod;
}
