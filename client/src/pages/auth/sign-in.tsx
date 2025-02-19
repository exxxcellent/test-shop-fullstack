import { PageLoader } from '@shared/ui';
import delayForDemo from '@shared/utils/delay';
import { Header } from '@widgets/general';
import { lazy, Suspense } from 'react';

const AuthForm = lazy(() =>
    delayForDemo(import('../../widgets/auth/ui/auth-form'))
);

export default function SignInPage() {
    return (
        <div className="min-h-screen flex flex-col gap-3">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center gap-3">
                <Suspense fallback={<PageLoader />}>
                    <AuthForm />
                </Suspense>
            </main>
        </div>
    );
}
