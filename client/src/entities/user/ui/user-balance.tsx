import { Button } from '@shared/ui';
import { useAuthStore } from '@store/useAuthStore';
import { useNavigate } from 'react-router';

export default function UserBalance() {
    const { user } = useAuthStore((state) => state);
    const router = useNavigate();

    const goToBalancePage = () => {
        router('/profile/balance');
    };

    return (
        <div className="flex flex-col gap-3">
            <div
                className="px-5 py-3 rounded-[20px] bg-white flex flex-col items-center justify-between select-none hover:bg-accent-primary/10 duration-150 cursor-pointer"
                onClick={goToBalancePage}>
                <div className="text-xl text-text-secondary py-1 px-4 bg-accent-primary/10 rounded-[20px]">
                    {user?.balance} ₽
                </div>
                <div className="text-text-secondary">Баланс</div>
            </div>
            <Button
                to="/profile/balance/fill"
                title="Пополнить"
                size="md"
            />
        </div>
    );
}
