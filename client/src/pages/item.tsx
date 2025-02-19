import { useParams } from 'react-router';
import { lazy, Suspense, useEffect, useState } from 'react';
import delayForDemo from '@shared/utils/delay';
import { ApiResponse } from '@shared/types';
import { Item } from '@entities/item';
import { useItemStore } from '@store/useItemStore';
import { Breadcrumb, Header } from '@widgets/general';
import { PageLoader, Plug } from '@shared/ui';

const ItemSection = lazy(() =>
    delayForDemo(import('../widgets/items/ui/item-section'))
);

export default function ItemPage() {
    const [item, setItem] = useState<ApiResponse<Item> | null>(null);
    const { getItemById } = useItemStore((state) => state);

    const params = useParams();

    const getItem = async () => {
        const item = await getItemById(params.itemId as string);
        setItem(item);
    };

    useEffect(() => {
        getItem();
    }, [params.itemId]);

    return (
        <>
            <Header />
            <Suspense fallback={<PageLoader />}>
                <Breadcrumb />
                <main className="flex flex-1">
                    {!item?.success && (
                        <div className="flex-1 flex items-center justify-center">
                            <Plug />
                        </div>
                    )}
                    {item?.data && <ItemSection item={item.data} />}
                </main>
            </Suspense>
        </>
    );
}
