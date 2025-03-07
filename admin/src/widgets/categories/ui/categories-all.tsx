import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Category } from '../../../entities/category/types/category.interface';
import { ApiResponse } from '@shared/types';
import { fetcher } from '@shared/utils/fetcher';
import CategoryCard from '../../../entities/category/ui/category-card';
import PageLoader from '@shared/ui/page-loader';
import PageError from '@shared/ui/page-error';

export default function CategoriesAll() {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['item'],
        queryFn: () => fetcher<ApiResponse<Category[]>>('/category'),
        select: (data) => data.data.data,
    });

    if (isLoading) return <PageLoader />;

    if (isError) return <PageError error={error} />;

    return (
        <Box className="flex flex-col gap-4 flex-1">
            <Typography variant="h5">All categories</Typography>
            {data?.length === 0 && <Typography>There are no items</Typography>}
            {data && (
                <ul className="grid md:grid-cols-3 xl:grid-cols-4 gap-3">
                    {data.map((item) => (
                        <CategoryCard
                            key={item.id}
                            data={item}
                        />
                    ))}
                </ul>
            )}
        </Box>
    );
}
