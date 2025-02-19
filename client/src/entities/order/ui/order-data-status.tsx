import { Order } from '../types/order.interface';

import check from '@icons/stepper-check.svg';
import active from '@icons/stepper-active.svg';
import disabled from '@icons/stepper-disabled.svg';
import cancel from '@icons/stepper-cancel.svg';

import { twMerge } from 'tailwind-merge';
import { OrderStatus } from '@shared/types';

interface OrderStatusProps {
    order: Order;
}

type Step = {
    title: string;
    description: string;
    status: OrderStatus;
    isCompleted?: boolean;
};

const steps: Step[] = [
    {
        title: 'Оплата товара',
        description: 'Чтобы продолжить, оплатите покупку',
        status: OrderStatus.CREATED,
    },
    {
        title: 'В очереди',
        description: 'Заказ находится в очереди на доставку',
        status: OrderStatus.PAID,
    },
    {
        title: 'Доставляем',
        description: 'Заказ скоро будет завершён',
        status: OrderStatus.DELIVERY,
    },
    {
        title: 'Заказ оформлен',
        description: 'Завершён',
        status: OrderStatus.COMPLETED,
    },
];

export default function OrderDataStatus({ order }: OrderStatusProps) {
    return (
        <ul className="flex flex-col justify-center gap-4 bg-white rounded-[20px] p-10 flex-1 text-sm">
            <li className="flex items-start gap-3 relative bottom-1">
                <img src={check} />
                <div
                    className={
                        'absolute left-[11px] top-[26px] w-[2px] h-5/6 rounded-[2px] bg-green-500'
                    }></div>
                <div className="flex flex-col pt-[2px] pb-6">
                    <span className="font-semibold text-text-secondary">
                        Заказ оформлен
                    </span>
                </div>
            </li>
            {steps.map((item, i) => {
                const isActive = order.status === OrderStatus[item.status];
                const isCompleted =
                    order.status !== OrderStatus[item.status] &&
                    i <
                        steps.findIndex(
                            (step) => OrderStatus[step.status] === order.status
                        );
                const isCanceled = order.status === OrderStatus.CANCELED;
                const orderIsCompleted = order.status === OrderStatus.COMPLETED;
                const stepIsLast = i === steps.length - 1;

                if (isCanceled && stepIsLast) return;

                return (
                    <li
                        className="flex items-start gap-3 relative"
                        key={i}>
                        {orderIsCompleted && <img src={check} />}
                        {!orderIsCompleted &&
                            (!isCanceled!! ? (
                                <img
                                    src={
                                        isCompleted
                                            ? check
                                            : isActive
                                            ? active
                                            : disabled
                                    }
                                    className={isActive ? 'animate-pulse' : ''}
                                />
                            ) : (
                                <img
                                    src={
                                        i === steps.length - 1 ? cancel : check
                                    }
                                />
                            ))}
                        <div
                            className={twMerge(
                                'absolute left-[11px] top-[26px] w-[2px] rounded-[2px] bg-accent-primary',
                                isCompleted
                                    ? 'bg-green-500'
                                    : isActive
                                    ? 'bg-accent-primary'
                                    : 'bg-gray-tertiary',
                                stepIsLast ? 'h-0' : ' h-5/6',
                                isCanceled ? 'bg-green-500' : ''
                            )}></div>
                        <div className="flex flex-col pt-[2px] pb-6">
                            <span className="font-semibold text-text-secondary">
                                {item.title}
                            </span>
                            <span
                                className={
                                    isActive
                                        ? 'text-text-secondary'
                                        : 'text-text-tertiary'
                                }>
                                {item.description}
                            </span>
                        </div>
                    </li>
                );
            })}
            {order.status === OrderStatus.CANCELED && (
                <li className="flex items-start gap-3">
                    <img src={cancel} />
                    <div className="flex flex-col pt-[2px] pb-6">
                        <span className="font-semibold text-text-secondary">
                            Отменен
                        </span>
                        <span className="text-text-secondary">
                            Деньги были возвращены на внутренний баланс
                        </span>
                    </div>
                </li>
            )}
        </ul>
    );
}
