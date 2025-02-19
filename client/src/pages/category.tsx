import { PageLoader } from '@shared/ui';
import delayForDemo from '@shared/utils/delay';
import { Breadcrumb, Header } from '@widgets/general';
import { lazy, Suspense } from 'react';

const CategoriesChips = lazy(() =>
    delayForDemo(import('../widgets/categories/ui/categories-chips'))
);
const ItemsCards = lazy(() =>
    delayForDemo(import('../widgets/items/ui/items-cards'))
);

export default function CategoryPage() {
    return (
        <>
            <Header />
            <Suspense fallback={<PageLoader />}>
                <Breadcrumb />
                <CategoriesChips />
                <ItemsCards />
            </Suspense>
        </>
    );
}
