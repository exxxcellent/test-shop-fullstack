import { Item } from '@entities/item';
import { ApiResponse, Field, REQUEST_METHOD } from '@shared/types';
import { Form } from '@shared/ui';
import { fetcher } from '@shared/utils/fetcher';
import { useMutation } from '@tanstack/react-query';
import { useNotifications } from '@toolpad/core';
import * as yup from 'yup';

const schema = yup.object({
    title: yup.string().max(100).required(),
    categoryId: yup.string().uuid().required(),
    price: yup.number().positive().required(),
    description: yup.string().max(400).optional(),
    amount: yup.number().positive().optional(),
    image: yup.mixed().required(),
});

export type CreateItemFormData = yup.InferType<typeof schema>;

const fields: Field<keyof CreateItemFormData>[] = [
    { name: 'title', label: 'title', type: 'text' },
    { name: 'categoryId', label: 'categoryId', type: 'text' },
    { name: 'price', label: 'price', type: 'number' },
    { name: 'description', label: 'description', type: 'text' },
    { name: 'amount', label: 'amount', type: 'number' },
    { name: 'image', label: 'image', type: 'file' },
];

export default function CreateItemForm() {
    const notifications = useNotifications();

    const { isPending, mutate } = useMutation({
        mutationFn: (data: Record<string, any>) =>
            fetcher<ApiResponse<Item>, Record<string, any>>(
                `/item/`,
                REQUEST_METHOD.POST,
                data,
            ),
        onSuccess: () => {
            notifications.show('Item is created!', {
                autoHideDuration: 5000,
                severity: 'success',
            });
        },
        onError: (error) => {
            notifications.show(`Error! ${error.message}`, {
                autoHideDuration: 5000,
                severity: 'error',
            });
            console.error(error);
        },
    });

    const onSubmitHandler = (data: CreateItemFormData) => {
        mutate(data);
    };

    return (
        <Form<CreateItemFormData>
            title="Create item"
            fields={fields}
            schema={schema}
            isPending={isPending}
            onSubmit={(data) => onSubmitHandler(data)}
        />
    );
}
