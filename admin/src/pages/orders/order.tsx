import { Box, Button, Typography } from '@mui/material';
import { ApiResponse } from '@shared/types';
import PageError from '@shared/ui/page-error';
import PageLoader from '@shared/ui/page-loader';
import TableProps from '@shared/ui/table-props';
import { fetcher } from '@shared/utils/fetcher';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { Entity } from '@shared/types/enums/entity.enum';
import { Order } from '@entities/order/types/order.interface';

export default function OrderPage() {
    const { id } = useParams();

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['order', id],
        queryFn: () => fetcher<ApiResponse<Order>>(`/order/${id}`),
        select: (data) => data.data.data,
    });

    if (isLoading) return <PageLoader />;

    if (isError || !data) return <PageError error={error} />;

    const onEditHandler = () => {
        setIsEdit((state) => !state);
    };

    return (
        <Box className="flex-1 flex flex-col gap-5">
            <Box>
                <Box className="flex justify-between">
                    <Typography
                        variant="h5"
                        sx={{ color: 'text.secondary' }}>
                        Order
                    </Typography>
                    <Button
                        onClick={onEditHandler}
                        startIcon={<EditIcon />}
                        variant="contained">
                        <Typography>Edit</Typography>
                    </Button>
                </Box>
                <Typography variant="h3">{data.id}</Typography>
                <Typography
                    variant="h6"
                    sx={{ color: 'text.secondary' }}>
                    Created: {new Date(data.createdAt).toLocaleString()}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{ color: 'text.secondary' }}>
                    Updated: {new Date(data.updatedAt).toLocaleString()}
                </Typography>
            </Box>
            <TableProps
                entity={Entity.ORDER}
                data={data}
                isEdit={isEdit}
                id={id as string}
                setIsEdit={setIsEdit}
            />
        </Box>
    );
}
