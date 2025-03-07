import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ApiResponse } from '@shared/types';
import { fetcher } from '@shared/utils/fetcher';
import PageLoader from '@shared/ui/page-loader';
import PageError from '@shared/ui/page-error';
import { User } from '@entities/user';
import UserCard from '@entities/user/ui/user-card';

export default function UsersAll() {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: () => fetcher<ApiResponse<User[]>>('/user'),
        select: (data) => data.data.data,
    });

    if (isLoading) return <PageLoader />;

    if (isError) return <PageError error={error} />;

    return (
        <Box className="flex flex-col gap-4 flex-1">
            <Typography variant="h5">All users</Typography>
            {data?.length === 0 && <Typography>There are no users</Typography>}
            {data && (
                <ul className="grid md:grid-cols-3 xl:grid-cols-4 gap-3">
                    {data.map((item) => (
                        <UserCard
                            key={item.id}
                            data={item}
                        />
                    ))}
                </ul>
            )}
        </Box>
    );
}
