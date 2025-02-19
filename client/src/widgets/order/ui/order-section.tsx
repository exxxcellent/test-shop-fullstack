import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useNavigate, useParams } from 'react-router';
import { useAuthStore } from '@store/useAuthStore';
import { useItemStore } from '@store/useItemStore';
import { useOrderStore } from '@store/useOrderStore';
import { ApiResponse, OrderStatus } from '@shared/types';
import { Order, OrderDataPreview, OrderDataStatus } from '@entities/order';
import { Item, ItemPreview } from '@entities/item';
import { Alert, Button, NavLink, Plug } from '@shared/ui';

export default function OrderSection() {
    const { isAuth } = useAuthStore((state) => state);
    const { getItemById } = useItemStore((state) => state);
    const { getOrderById, payOrder } = useOrderStore((state) => state);

    const [order, setOrder] = useState<ApiResponse<Order> | null>(null);
    const [item, setItem] = useState<ApiResponse<Item> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const params = useParams();
    const router = useNavigate();

    const getOrder = async () => {
        const order = await getOrderById(params.orderId as string);
        setOrder(order);
    };

    useEffect(() => {
        getOrder();
    }, [params]);

    const getItem = async () => {
        if (!order) return;
        const item = await getItemById(order.data.itemId as string);
        setItem(item);
    };

    useEffect(() => {
        getItem();
    }, [order]);

    useEffect(() => {
        if (!isAuth) router('/profile');
    }, []);

    if (!order?.success) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <Plug />
            </div>
        );
    }

    if (!item?.success) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <Plug />
            </div>
        );
    }

    const orderNumber = order.data.id.split('').splice(-8).join('');

    const onSubmitHandler = async () => {
        try {
            setIsLoading(true);
            const isPayed = await payOrder(order.data.id);
            if (isPayed) router('/profile');
        } catch (e) {
            console.error(e);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section
            id="order"
            className="w-full flex-1 bg-gray-secondary rounded-t-[24px] flex flex-col gap-3 xl:px-0">
            <div>
                <h1 className="text-2xl font-bold text-text-secondary">
                    Заказ #{orderNumber}
                </h1>
                <p className="text-text-tertiary text-sm">
                    {new Date(order.data.createdAt).toLocaleString()}
                </p>
            </div>
            <ItemPreview item={item?.data} />
            <OrderDataPreview order={order.data} />
            <OrderDataStatus order={order.data} />
            {order.data.status === OrderStatus.CREATED && (
                <Button
                    title="Оплатить"
                    onClick={onSubmitHandler}
                    isLoading={isLoading}
                />
            )}
            {order.data.status === OrderStatus.CANCELED &&
                order.data.message && (
                    <Alert variant="info">{parse(order.data.message)}</Alert>
                )}
            <p className="text-xs text-text-tertiary text-center">
                Совершая покупку, Вы принимаете{' '}
                <NavLink to="#">Пользовательское соглашение</NavLink> и{' '}
                <NavLink to="#">Политику конфиденциальности</NavLink>
            </p>
        </section>
    );
}
