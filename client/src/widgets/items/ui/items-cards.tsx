import { Item, ItemCard } from '@entities/item';
import { PageLoader, Plug } from '@shared/ui';
import { useCategoryStore } from '@store/useCategoryStore';
import { useItemStore } from '@store/useItemStore';
import { Suspense, useEffect } from 'react';

export default function ItemsCards() {
    const { categories, selectedCategory } = useCategoryStore((state) => state);
    const { items, getItemsByCategory } = useItemStore((state) => state);

    useEffect(() => {
        getItemsByCategory(categories[0]);
    }, [categories]);

    return (
        <section
            id="items"
            className="p-4 flex-1 flex flex-col gap-1 bg-white rounded-[20px]">
            <h1 className="text-2xl font-bold text-text-secondary mb-2 capitalize">
                {selectedCategory?.title}
            </h1>
            <Suspense fallback={<PageLoader />}>
                {items.length === 0 && (
                    <div className="flex items-center justify-center flex-1">
                        <Plug />
                    </div>
                )}
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[5px]">
                    {items.map((item: Item) => (
                        <li key={item.id}>
                            <ItemCard item={item} />
                        </li>
                    ))}
                </ul>
            </Suspense>
        </section>
    );
}
