import { PageLoader } from '@shared/ui';
import delayForDemo from '@shared/utils/delay';
import { Header } from '@widgets/general';
import { lazy, Suspense } from 'react';

const OrderCreateForm = lazy(() =>
    delayForDemo(import('../../widgets/order/ui/order-create-form'))
);

export default function OrderCreatePage() {
    return (
        <div className="min-h-screen flex flex-col gap-3">
            <Header />
            <Suspense fallback={<PageLoader />}>
                <OrderCreateForm />
            </Suspense>
        </div>
    );
}
