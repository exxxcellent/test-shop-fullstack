import { PageLoader } from '@shared/ui';
import delayForDemo from '@shared/utils/delay';
import { useAuthStore } from '@store/useAuthStore';
import { Breadcrumb, Header } from '@widgets/general';
import { lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router';

const FillBalanceForm = lazy(() =>
    delayForDemo(import('../../widgets/profile/ui/fill-balance-form'))
);

export default function FillBalancePage() {
    const { isAuth } = useAuthStore((state) => state);

    const router = useNavigate();

    useEffect(() => {
        if (!isAuth) router('/');
    }, []);

    return (
        <div className="min-h-screen flex flex-col gap-3">
            <Header />
            <Breadcrumb />
            <main className="flex-1 flex flex-col gap-3 px-4">
                <Suspense fallback={<PageLoader />}>
                    <FillBalanceForm />
                </Suspense>
            </main>
        </div>
    );
}
