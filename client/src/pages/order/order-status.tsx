import { Order } from '@entities/order';
import { ApiResponse } from '@shared/types';
import { PageLoader } from '@shared/ui';
import delayForDemo from '@shared/utils/delay';
import { useOrderStore } from '@store/useOrderStore';
import { Breadcrumb, Header } from '@widgets/general';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router';

const OrderSection = lazy(() =>
    delayForDemo(import('../../widgets/order/ui/order-section'))
);

export default function OrderStatusPage() {
    const [order, setOrder] = useState<ApiResponse<Order> | null>(null);
    const { getOrderById } = useOrderStore((state) => state);

    const params = useParams();

    const getOrder = async () => {
        const order = await getOrderById(params.orderId as string);
        setOrder(order);
    };

    useEffect(() => {
        getOrder();
    }, [params]);

    return (
        <>
            <Header />
            <Suspense fallback={<PageLoader />}>
                <Breadcrumb />
                <main className="flex-1 flex flex-col justify-start px-4 pb-3">
                    {order?.data && <OrderSection order={order.data} />}
                </main>
            </Suspense>
        </>
    );
}
