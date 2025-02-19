import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as yup from 'yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { twMerge } from 'tailwind-merge';
import { useItemStore } from '@store/useItemStore';
import { useAuthStore } from '@store/useAuthStore';
import { useOrderStore } from '@store/useOrderStore';
import { ApiResponse, BalancePaymentMethod } from '@shared/types';
import { Item, ItemPreview } from '@entities/item';
import { Alert, Button, Input, NavLink, Plug } from '@shared/ui';
import { CreateOrderBody } from '@shared/types/store/order-store.interface';
import { PaymentMethods } from '@widgets/payment';

const schema = yup
    .object({
        email: yup
            .string()
            .email('Email is not valid')
            .required('Email is required!'),
        address: yup.string().required('Address is required!'),
    })
    .required();

type FormData = yup.InferType<typeof schema>;

export default function OrderCreateForm() {
    const { getItemById } = useItemStore((state) => state);
    const { isAuth, user, login } = useAuthStore((state) => state);
    const { create } = useOrderStore((state) => state);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: user ? user.email : '',
            address: '',
        },
    });

    const email = useWatch({ control, name: 'email' });
    const address = useWatch({ control, name: 'address' });

    const [item, setItem] = useState<ApiResponse<Item> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [paymentMethod, setPaymentMethod] =
        useState<BalancePaymentMethod | null>(null);

    const params = useParams();
    const router = useNavigate();

    const getItem = async () => {
        const item = await getItemById(params.itemId as string);
        setItem(item);
    };

    useEffect(() => {
        getItem();
    }, [params]);

    if (!item?.success) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <Plug />
            </div>
        );
    }

    const balanceIsPayable = user && user.balance >= item.data.price;

    const onSubmitHandler = async ({ address }: FormData) => {
        try {
            setIsLoading(true);
            if (!user) {
                const user = await login(email);
                if (!user) return;
                const body: CreateOrderBody = {
                    userId: user?.data.user.id,
                    itemId: item.data.id,
                    address: address,
                    paymentMethod: balanceIsPayable
                        ? BalancePaymentMethod.OTHER
                        : paymentMethod,
                };
                const isCreated = await create(body);
                if (isCreated?.success)
                    router('/auth/order-created-unauthorized/');
                return;
            }
            const body: CreateOrderBody = {
                userId: user.id,
                itemId: item.data.id,
                address: address,
                paymentMethod: balanceIsPayable
                    ? BalancePaymentMethod.OTHER
                    : paymentMethod,
            };
            const createdOrder = await create(body);
            if (createdOrder?.success) router(`/order/${createdOrder.data.id}`);
        } catch (e) {
            console.error(e);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            className="flex-1 flex flex-col justify-start gap-3 px-4 pb-3"
            onSubmit={handleSubmit((data) => onSubmitHandler(data))}>
            <h1 className="text-2xl font-bold text-text-secondary">
                Оплата покупки
            </h1>
            {item?.data && <ItemPreview item={item?.data} />}
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
                name="address"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        error={errors.address && true}
                        errorLabel={errors.address?.message}
                        placeholder="Address"
                    />
                )}
            />
            {!isAuth && (
                <Alert variant="info">
                    Перед оформлением заказа убедитесь, что{' '}
                    <b>Вы указали верную почту</b>, чтобы не потерять заказ
                </Alert>
            )}
            {user && isAuth && !(user.balance >= item.data.price) && (
                <PaymentMethods setPaymentMethod={setPaymentMethod} />
            )}
            {!isAuth && <PaymentMethods setPaymentMethod={setPaymentMethod} />}
            <div
                className={twMerge(
                    'flex-1 flex flex-col gap-3',
                    balanceIsPayable && 'justify-end',
                    !isAuth && 'justify-end'
                )}>
                {isAuth && (
                    <div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-text-secondary">
                                Останется оплатить
                            </span>
                            <span className="font-semibold text-text-secondary text-2xl">
                                {user && item.data.price >= user.balance
                                    ? item.data.price -
                                      (user ? user.balance : item.data.price)
                                    : 0}{' '}
                                ₽
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-text-secondary">
                                Спишем с баланса
                            </span>
                            <span className="font-semibold text-text-secondary text-2xl">
                                {user && item.data.price >= user.balance
                                    ? user.balance
                                    : item.data.price}{' '}
                                ₽
                            </span>
                        </div>
                    </div>
                )}
                <Button
                    type="submit"
                    title="Оплатить"
                    isLoading={isLoading}
                    disabled={
                        isAuth
                            ? email === '' ||
                              address === '' ||
                              !!(
                                  paymentMethod === undefined &&
                                  user &&
                                  item.data.price >= user.balance
                              )
                            : email === '' ||
                              address === '' ||
                              !!(paymentMethod === null)
                    }
                />
                <p className="text-xs text-text-tertiary text-center">
                    Совершая покупку, Вы принимаете{' '}
                    <NavLink to="#">Пользовательское соглашение</NavLink> и{' '}
                    <NavLink to="#">Политику конфиденциальности</NavLink>
                </p>
            </div>
        </form>
    );
}
