import { Link } from 'react-router';
import OrderBadge from './order-badge';
import { Order } from '../types/order.interface';

interface OrderHistoryProps {
    order: Order;
}

export default function OrderHistory({ order }: OrderHistoryProps) {
    const orderNumber = order.id.split('').splice(-8).join('');

    return (
        <Link
            to={`/order/${order.id}`}
            className="bg-white py-3 px-5 w-full flex items-stretch justify-between rounded-[20px] hover:bg-accent-primary/10 duration-200">
            <div className="flex flex-col">
                <h4 className="font-medium text-text-secondary text-sm">
                    Заказ №{orderNumber}
                </h4>
                <p className="text-text-tertiary text-sm">
                    {new Date(order.createdAt).toLocaleString()}
                </p>
            </div>
            <div className="flex flex-col gap-1 self-end">
                <OrderBadge status={order.status} />
                <p className="font-semibold text-text-secondary text-sm text-right">
                    {order.sum} ₽
                </p>
            </div>
        </Link>
    );
}
