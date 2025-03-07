import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ApiResponse } from '@shared/types';
import { fetcher } from '@shared/utils/fetcher';
import PageLoader from '@shared/ui/page-loader';
import PageError from '@shared/ui/page-error';
import { Balance } from '@entities/payment';
import PaymentCard from '@entities/payment/ui/payment-card';

interface PaymentsAllProps {
    userId: string;
}

export default function PaymentsAll({ userId }: PaymentsAllProps) {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['payment'],
        queryFn: () => fetcher<ApiResponse<Balance[]>>(`/payment/${userId}`),
        select: (data) => data.data.data,
    });

    if (isLoading) return <PageLoader />;

    if (isError) return <PageError error={error} />;

    return (
        <Box className="flex flex-col gap-4 flex-1">
            <Typography variant="h4">Payments</Typography>
            {data?.length === 0 && (
                <Typography>There are no payments</Typography>
            )}
            {data && (
                <ul className="grid md:grid-cols-3 xl:grid-cols-4 gap-3">
                    {data.map((item) => (
                        <PaymentCard
                            key={item.id}
                            data={item}
                        />
                    ))}
                </ul>
            )}
        </Box>
    );
}
