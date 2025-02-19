import { Balance } from '@entities/balance';
import { User } from '@entities/user';
import { BalancePaymentMethod } from '../enums/balance-payment_method.enum';

export interface BalanceStore {
    payments: Balance[];
    getBalanceHistoryByUserId: (userId: string) => void;
    fillBalance: (
        userId: string,
        sum: number,
        paymentMethod: BalancePaymentMethod | null
    ) => Promise<{ user: User; payment: Balance }>;
}
