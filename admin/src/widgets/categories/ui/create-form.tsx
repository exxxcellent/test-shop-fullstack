import { Category } from '@entities/category';
import { ApiResponse, Field, REQUEST_METHOD } from '@shared/types';
import { Form } from '@shared/ui';
import { fetcher } from '@shared/utils/fetcher';
import { useMutation } from '@tanstack/react-query';
import { useNotifications } from '@toolpad/core';
import * as yup from 'yup';

const schema = yup.object({
    title: yup.string().required().lowercase(),
    popularity: yup.number(),
    parentId: yup.string().uuid().optional(),
});

export type CreateCategoryFormData = yup.InferType<typeof schema>;

const fields: Field<keyof CreateCategoryFormData>[] = [
    { name: 'title', label: 'title', type: 'text' },
    { name: 'popularity', label: 'popularity', type: 'number' },
    { name: 'parentId', label: 'parentId', type: 'text' },
];

export default function CreateCategoryForm() {
    const notifications = useNotifications();

    const { isPending, mutate } = useMutation({
        mutationFn: (data: Record<string, any>) =>
            fetcher<ApiResponse<Category>, Record<string, any>>(
                `/category/`,
                REQUEST_METHOD.POST,
                data,
            ),
        onSuccess: () => {
            notifications.show('Category is created!', {
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

    const onSubmitHandler = (data: CreateCategoryFormData) => {
        mutate(data);
    };

    return (
        <Form<CreateCategoryFormData>
            title="Create category"
            fields={fields}
            schema={schema}
            isPending={isPending}
            onSubmit={(data) => onSubmitHandler(data)}
        />
    );
}
