import { BalanceStatus } from '@shared/types';
import { Balance } from '../types/balance.interface';

interface BalanceHistoryProps {
    payment: Balance;
}

export default function BalanceHistory({ payment }: BalanceHistoryProps) {
    const orderNumber = payment.id.split('').splice(-8).join('');

    const paymentStatus: Record<BalanceStatus, string> = {
        [BalanceStatus.PAID]: '-',
        [BalanceStatus.RETURN]: '+',
        [BalanceStatus.REFILL]: '+',
    };

    const paymentMessage: Record<BalanceStatus, string> = {
        [BalanceStatus.PAID]: 'Оплата заказа',
        [BalanceStatus.RETURN]: 'Возврат',
        [BalanceStatus.REFILL]: 'Пополнение',
    };

    return (
        <div className="bg-white py-3 px-5 w-full flex items-stretch justify-between rounded-[20px]">
            <div className="flex flex-col">
                <h4 className="font-medium text-text-secondary text-sm">
                    {paymentMessage[payment.status]} №{orderNumber}
                </h4>
                <p className="text-text-tertiary text-sm">
                    {new Date(payment.createdAt).toLocaleString()}
                </p>
            </div>
            <div className="flex flex-col gap-1 self-end">
                <p className="font-semibold text-text-secondary text-sm text-right">
                    {paymentStatus[payment.status] + ' ' + payment.sum} ₽
                </p>
            </div>
        </div>
    );
}
