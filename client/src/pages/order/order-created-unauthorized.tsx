import { PageLoader } from '@shared/ui';
import delayForDemo from '@shared/utils/delay';
import { Header } from '@widgets/general';
import { lazy, Suspense } from 'react';

const OrderCreateUnauthorized = lazy(() =>
    delayForDemo(import('../../widgets/order/ui/order-created-unauthorized'))
);

export default function OrderCreateUnauthorizedPage() {
    return (
        <div className="min-h-screen flex flex-col gap-3">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center gap-3">
                <Suspense fallback={<PageLoader />}>
                    <OrderCreateUnauthorized />
                </Suspense>
            </main>
        </div>
    );
}
