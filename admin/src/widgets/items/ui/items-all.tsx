import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ApiResponse } from '@shared/types';
import { fetcher } from '@shared/utils/fetcher';
import PageLoader from '@shared/ui/page-loader';
import PageError from '@shared/ui/page-error';
import ItemCard from '@entities/item/ui/item-card';
import { Item } from '@entities/item';

export default function ItemsAll() {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['item'],
        queryFn: () => fetcher<ApiResponse<Item[]>>('/item'),
        select: (data) => data.data.data,
    });

    if (isLoading) return <PageLoader />;

    if (isError) return <PageError error={error} />;

    return (
        <Box className="flex flex-col gap-4 flex-1">
            <Typography variant="h5">All items</Typography>
            {data?.length === 0 && <Typography>There are no items</Typography>}
            {data && (
                <ul className="grid md:grid-cols-3 xl:grid-cols-4 gap-3">
                    {data.map((item) => (
                        <ItemCard
                            key={item.id}
                            data={item}
                        />
                    ))}
                </ul>
            )}
        </Box>
    );
}
