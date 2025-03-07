import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ApiResponse } from '@shared/types';
import { fetcher } from '@shared/utils/fetcher';
import PageLoader from '@shared/ui/page-loader';
import PageError from '@shared/ui/page-error';
import OrderCard from '@entities/order/ui/order-card';
import { Order } from '@entities/order/types/order.interface';

interface OrderAllProps {
    userId: string | null;
}

export default function OrdersAll({ userId }: OrderAllProps) {
    const url = userId ? `/order/${userId}/orders` : '/order';

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['order'],
        queryFn: () => fetcher<ApiResponse<Order[]>>(url),
        select: (data) => data.data.data,
    });

    if (isLoading) return <PageLoader />;

    if (isError) return <PageError error={error} />;

    return (
        <Box className="flex flex-col gap-4 flex-1">
            <Typography variant="h5">All orders</Typography>
            {data?.length === 0 && <Typography>There are no orders</Typography>}
            {data && (
                <ul className="grid md:grid-cols-1 xl:grid-cols-2 gap-3">
                    {data.map((item) => (
                        <OrderCard
                            key={item.id}
                            data={item}
                        />
                    ))}
                </ul>
            )}
        </Box>
    );
}
