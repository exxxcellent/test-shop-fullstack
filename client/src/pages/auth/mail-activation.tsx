import { PageLoader } from '@shared/ui';
import delayForDemo from '@shared/utils/delay';
import { Header } from '@widgets/general';
import { lazy, Suspense } from 'react';

const MailActivation = lazy(() =>
    delayForDemo(import('../../widgets/auth/ui/mail-activation'))
);

export default function MailActivationPage() {
    return (
        <div className="min-h-screen flex flex-col gap-3">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center gap-3">
                <Suspense fallback={<PageLoader />}>
                    <MailActivation />
                </Suspense>
            </main>
        </div>
    );
}
