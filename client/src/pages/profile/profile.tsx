import { UserBalance, UserOrdersHistory } from '@entities/user';
import { PageLoader } from '@shared/ui';
import delayForDemo from '@shared/utils/delay';
import { useAuthStore } from '@store/useAuthStore';
import { useOrderStore } from '@store/useOrderStore';
import { Header } from '@widgets/general';
import { lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router';

const UserHeader = lazy(() =>
    delayForDemo(import('../../entities/user/ui/user-header'))
);

export default function ProfilePage() {
    const { getOrdersByUserId, orders } = useOrderStore((state) => state);
    const { isAuth, user, getById, setUser } = useAuthStore((state) => state);

    const router = useNavigate();

    const updateUser = async () => {
        if (user) {
            const updatedUser = await getById(user.id);
            if (updatedUser) setUser(updatedUser?.data);
        }
    };

    useEffect(() => {
        if (!isAuth) router('/');
        if (user) {
            getOrdersByUserId(user.id);
            updateUser();
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col gap-3">
            <Header />
            <Suspense fallback={<PageLoader />}>
                <main className="flex-1 flex flex-col gap-3 px-4">
                    <UserHeader />
                    <UserBalance />
                    <UserOrdersHistory orders={orders} />
                </main>
            </Suspense>
        </div>
    );
}
