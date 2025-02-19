import { Button, Input, NavLink } from '@shared/ui';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthStore } from '@store/useAuthStore';

const schema = yup
    .object({
        email: yup
            .string()
            .email('Email is not valid')
            .required('Email is required!'),
    })
    .required();

type FormData = yup.InferType<typeof schema>;

export default function AuthForm() {
    const { login, isAuth } = useAuthStore((state) => state);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmitHandler = async ({ email }: FormData) => {
        try {
            setIsLoading(true);
            const isLogined = await login(email);
            if (isLogined) router('/auth/mail-activation');
        } catch (e) {
            console.error(e);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuth) router('/profile');
    }, []);

    return (
        <form
            onSubmit={handleSubmit((data) => onSubmitHandler(data))}
            className="px-4 flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-text-secondary">
                Вход или регистрация
            </h2>
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        error={errors.email && true}
                        errorLabel={errors.email?.message}
                        placeholder="Email"
                    />
                )}
            />
            <Button
                title="Войти"
                type="submit"
                size="md"
                isLoading={isLoading}
            />
            <p className="text-xs text-text-tertiary text-center">
                Продолжая, Вы принимаете{' '}
                <NavLink to="#">Пользовательское соглашение</NavLink> и{' '}
                <NavLink to="#">Политику конфиденциальности</NavLink>
            </p>
        </form>
    );
}
