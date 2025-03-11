import { Category } from '@entities/category';
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
import CategoryCard from '@entities/category/ui/category-card';
import { useNotifications } from '@toolpad/core';
import { Entity } from '@shared/types/enums/entity.enum';

export default function CategoryPage() {
    const { id } = useParams();
    const router = useNavigate();

    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['category', id],
        queryFn: () => fetcher<ApiResponse<Category>>(`/category/${id}`),
        select: (data) => data.data.data,
    });

    const {
        isSuccess: deleteIsSuccess,
        isPending: deleteIsPending,
        mutate: onDelete,
    } = useMutation({
        mutationKey: ['category', id],
        mutationFn: () =>
            fetcher<ApiResponse<Category>>(
                `/category/${id}`,
                REQUEST_METHOD.DELETE,
            ),
        onSuccess: () => {
            notifications.show(
                'Category is deleted, you will be redirected through 5s!',
                {
                    autoHideDuration: 5000,
                    severity: 'success',
                },
            );
            queryClient.invalidateQueries({ queryKey: ['category', id] });
        },
        onError: (error) => {
            notifications.show(`Error! ${error.message}`, {
                autoHideDuration: 5000,
                severity: 'error',
            });
            console.error(error);
        },
    });

    const {
        data: subcategories,
        isError: subcategoriesIsError,
        isLoading: subcategoriesIsLoading,
        error: subcategoriesError,
    } = useQuery({
        queryKey: ['category', id, 'subcategories'],
        queryFn: () =>
            fetcher<ApiResponse<Category[]>>(
                `/category/${data?.title}/categories`,
            ),
        select: (data) => data.data.data,
    });

    if (isLoading || subcategoriesIsLoading) return <PageLoader />;

    if (isError || !data || subcategoriesIsError || !subcategories)
        return <PageError error={error || subcategoriesError} />;

    if (deleteIsSuccess) setTimeout(() => router('/categories'), 5000);

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
                        Category
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
                entity={Entity.CATEGORY}
                data={data}
                isEdit={isEdit}
                id={id as string}
                setIsEdit={setIsEdit}
            />
            {data._count?.subcategories !== 0 && (
                <>
                    <Typography variant="h4">Subcategories</Typography>
                    <ul className="grid md:grid-cols-3 xl:grid-cols-4 gap-3">
                        {subcategories[0].subcategories.map((item) => (
                            <li key={item.id}>
                                <CategoryCard data={item} />
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </Box>
    );
}
