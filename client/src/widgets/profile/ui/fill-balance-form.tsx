import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useBalanceStore } from '@store/useBalanceStore';
import { useAuthStore } from '@store/useAuthStore';
import { BalancePaymentMethod } from '@shared/types';
import { Button, Input } from '@shared/ui';
import { PaymentMethods } from '@widgets/payment';
import * as yup from 'yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
    .object({
        email: yup
            .string()
            .email('Email is not valid')
            .required('Email is required!'),
        sum: yup.number().min(1000, 'Min is 1000').required('Sum is required!'),
    })
    .required();

type FormData = yup.InferType<typeof schema>;

export default function FillBalanceForm() {
    const { fillBalance } = useBalanceStore((state) => state);
    const { user, isAuth } = useAuthStore((state) => state);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: user ? user.email : '',
        },
    });

    const email = useWatch({ control, name: 'email' });
    const sum = useWatch({ control, name: 'sum' });

    const [paymentMethod, setPaymentMethod] =
        useState<BalancePaymentMethod | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useNavigate();

    const onSubmitHandler = async ({ sum }: FormData) => {
        try {
            setIsLoading(true);
            if (!user || !paymentMethod) return;
            await fillBalance(user.id, sum, paymentMethod);
            router('/profile/balance');
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h2 className="text-2xl font-semibold text-text-secondary">
                Пополнение баланса
            </h2>
            <form
                onSubmit={handleSubmit((data) => onSubmitHandler(data))}
                className="flex flex-col gap-3">
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            disabled={isAuth}
                            error={errors.email && true}
                            errorLabel={errors.email?.message}
                            placeholder="Email"
                        />
                    )}
                />
                <Controller
                    name="sum"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="number"
                            error={errors.sum && true}
                            errorLabel={errors.sum?.message}
                            placeholder="Sum"
                        />
                    )}
                />
                <PaymentMethods setPaymentMethod={setPaymentMethod} />
                <Button
                    title="Пополнить"
                    type="submit"
                    disabled={email === '' || !sum || paymentMethod === null}
                    isLoading={isLoading}
                />
            </form>
        </>
    );
}
