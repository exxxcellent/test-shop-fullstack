import comment from '@icons/comment.svg';
import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';
import { useAuthStore } from '@store/useAuthStore';
import { useBalanceStore } from '@store/useBalanceStore';
import { Balance, BalanceHistory } from '@entities/balance';

export default function UserBalanceHistory() {
    const { user, getById, setUser } = useAuthStore((state) => state);
    const { payments, getBalanceHistoryByUserId } = useBalanceStore(
        (state) => state
    );

    const updateUser = async () => {
        if (user) {
            const updatedUser = await getById(user.id);
            if (updatedUser) setUser(updatedUser?.data);
        }
    };

    useEffect(() => {
        if (user) {
            getBalanceHistoryByUserId(user.id);
            updateUser();
        }
    }, []);

    return (
        <div className="flex flex-col gap-3 flex-1">
            <h2 className="text-xl text-text-secondary font-semibold">
                История баланса
            </h2>
            <div className="flex flex-col items-center justify-start gap-1 flex-1">
                <div
                    className={twMerge(
                        'flex justify-center items-center',
                        payments.length === 0 && 'flex-1'
                    )}>
                    {payments.length === 0 && (
                        <div className="flex flex-col gap-3 items-center">
                            <img
                                src={comment}
                                className="w-24 h-24"
                            />
                            <div className="text-xl text-center">
                                <p>Пока ничего нет</p>
                            </div>
                        </div>
                    )}
                </div>
                {payments.map((payment: Balance) => (
                    <BalanceHistory
                        payment={payment}
                        key={payment.id}
                    />
                ))}
            </div>
        </div>
    );
}
