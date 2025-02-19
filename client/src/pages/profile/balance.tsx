import { PageLoader } from '@shared/ui';
import delayForDemo from '@shared/utils/delay';
import { useAuthStore } from '@store/useAuthStore';
import { Breadcrumb, Header } from '@widgets/general';
import { lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router';

const UserBalance = lazy(() =>
    delayForDemo(import('../../entities/user/ui/user-balance'))
);
const UserBalanceHistory = lazy(() =>
    delayForDemo(import('../../entities/user/ui/user-balance-history'))
);

export default function BalancePage() {
    const { isAuth } = useAuthStore((state) => state);

    const router = useNavigate();

    useEffect(() => {
        if (!isAuth) router('/');
    }, []);

    return (
        <div className="min-h-screen flex flex-col gap-3">
            <Header />
            <Breadcrumb />
            <Suspense fallback={<PageLoader />}>
                <main className="flex-1 flex flex-col gap-3 px-4">
                    <UserBalance />
                    <UserBalanceHistory />
                </main>
            </Suspense>
        </div>
    );
}
