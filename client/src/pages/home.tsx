import { PageLoader } from '@shared/ui';
import delayForDemo from '@shared/utils/delay';
import { Footer, Header } from '@widgets/general';
import { lazy, Suspense } from 'react';

const News = lazy(() => import('../widgets/news/ui/news'));
const CategoriesCards = lazy(() =>
    delayForDemo(import('../widgets/categories/ui/categories-cards'))
);
const CategoriesPopular = lazy(() =>
    delayForDemo(import('../widgets/categories/ui/categories-popular'))
);

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col justify-between gap-3">
            <Header />
            <Suspense fallback={<PageLoader />}>
                <main className="flex-1 flex flex-col gap-3">
                    <News />
                    <CategoriesPopular />
                    <CategoriesCards />
                </main>
                <Footer />
            </Suspense>
        </div>
    );
}
