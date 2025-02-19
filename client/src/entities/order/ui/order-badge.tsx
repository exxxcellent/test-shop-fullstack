import { twMerge } from 'tailwind-merge';
import progress from '@icons/progress.svg';
import check from '@icons/check.svg';
import cancel from '@icons/cancel.svg';
import { OrderStatus } from '@shared/types';

interface OrderBadgeProps {
    status: OrderStatus;
}

export default function OrderBadge({ status }: OrderBadgeProps) {
    const variants: Record<OrderStatus, string> = {
        [OrderStatus.CREATED]: 'bg-orange-400/30 text-orange-600',
        [OrderStatus.PAID]: 'bg-orange-400/30 text-orange-600',
        [OrderStatus.DELIVERY]: 'bg-orange-400/30 text-orange-600',
        [OrderStatus.COMPLETED]: 'bg-green-400/30 text-green-600',
        [OrderStatus.CANCELED]: 'bg-red-400/30 text-red-600',
    };

    const icons: Record<OrderStatus, string> = {
        [OrderStatus.CREATED]: progress,
        [OrderStatus.PAID]: progress,
        [OrderStatus.DELIVERY]: progress,
        [OrderStatus.COMPLETED]: check,
        [OrderStatus.CANCELED]: cancel,
    };

    const statuses: Record<OrderStatus, string> = {
        [OrderStatus.CREATED]: 'Ждет оплаты',
        [OrderStatus.PAID]: 'В очереди',
        [OrderStatus.DELIVERY]: 'Доставляется',
        [OrderStatus.COMPLETED]: 'Выполнен',
        [OrderStatus.CANCELED]: 'Отменен',
    };

    return (
        <div
            className={twMerge(
                'py-[3px] px-2 rounded-2xl bg-accent-primary/20 text-xs font-semibold flex gap-1 items-center select-none',
                variants[status]
            )}>
            <img
                src={icons[status]}
                className="w-4 h-4"
            />
            {statuses[status]}
        </div>
    );
}
