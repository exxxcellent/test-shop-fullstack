import { Order, OrderHistory } from '@entities/order';
import { Plug } from '@shared/ui';
import { twMerge } from 'tailwind-merge';

interface UserOrdersHistoryProps {
    orders: Order[];
}

export default function UserOrdersHistory({ orders }: UserOrdersHistoryProps) {
    return (
        <div className="flex flex-col gap-3 flex-1">
            <h2 className="text-xl text-text-secondary font-semibold">
                История покупок
            </h2>
            <div className="flex flex-col items-center flex-1 gap-1">
                <div
                    className={twMerge(
                        'flex justify-center items-center',
                        orders.length === 0 && 'flex-1'
                    )}>
                    {orders.length === 0 && <Plug />}
                </div>
                {orders.map((order) => (
                    <OrderHistory
                        key={order.id}
                        order={order}
                    />
                ))}
            </div>
        </div>
    );
}
