import { Category, CategoryPopular } from '@entities/category';
import { useCategoryStore } from '@store/useCategoryStore';
import { useEffect } from 'react';

export default function CategoriesPopular() {
    const { categories, getCategories } = useCategoryStore((state) => state);

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <section
            id="categories-popular"
            className="px-4 flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-text-secondary mb-2">
                Популярное
            </h2>
            <div className="flex items-center gap-5 overflow-x-auto scrollbar">
                {categories.map((category: Category) => (
                    <CategoryPopular
                        key={category.id}
                        category={category}
                    />
                ))}
            </div>
        </section>
    );
}
