import { Box, Button, Typography } from '@mui/material';
import { ApiResponse, REQUEST_METHOD } from '@shared/types';
import PageError from '@shared/ui/page-error';
import PageLoader from '@shared/ui/page-loader';
import TableProps from '@shared/ui/table-props';
import { fetcher } from '@shared/utils/fetcher';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useNotifications } from '@toolpad/core';
import { Entity } from '@shared/types/enums/entity.enum';
import { Item } from '@entities/item';

export default function ItemPage() {
    const { id } = useParams();
    const router = useNavigate();

    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['item', id],
        queryFn: () => fetcher<ApiResponse<Item>>(`/item/${id}`),
        select: (data) => data.data.data,
    });

    const {
        isSuccess: deleteIsSuccess,
        isPending: deleteIsPending,
        mutate: onDelete,
    } = useMutation({
        mutationKey: ['item', id],
        mutationFn: () =>
            fetcher<ApiResponse<Item>>(`/item/${id}`, REQUEST_METHOD.DELETE),
        onSuccess: () => {
            notifications.show(
                'Item is deleted, you will be redirected through 5s!',
                {
                    autoHideDuration: 5000,
                    severity: 'success',
                },
            );
            queryClient.invalidateQueries({ queryKey: ['item', id] });
        },
        onError: (error) => {
            notifications.show(`Error! ${error.message}`, {
                autoHideDuration: 5000,
                severity: 'error',
            });
            console.error(error);
        },
    });

    if (isLoading) return <PageLoader />;

    if (isError || !data) return <PageError error={error} />;

    if (deleteIsSuccess) setTimeout(() => router('/items'), 5000);

    const onDeleteHandler = () => {
        onDelete();
    };

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
                        Item
                    </Typography>
                    <Box className="grid grid-cols-2 gap-3">
                        <Button
                            onClick={onEditHandler}
                            startIcon={<EditIcon />}
                            variant="contained">
                            <Typography>Edit</Typography>
                        </Button>
                        <Button
                            onClick={onDeleteHandler}
                            startIcon={<DeleteIcon />}
                            loading={deleteIsPending}
                            disabled={deleteIsPending}
                            loadingPosition="center"
                            color="error"
                            variant="contained">
                            Delete
                        </Button>
                    </Box>
                </Box>
                <Typography
                    variant="h3"
                    className="capitalize">
                    {data.title}
                </Typography>
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
                entity={Entity.ITEM}
                data={data}
                isEdit={isEdit}
                id={id as string}
                setIsEdit={setIsEdit}
            />
        </Box>
    );
}
