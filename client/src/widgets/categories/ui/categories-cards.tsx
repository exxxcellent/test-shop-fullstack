import { Category, CategoryCard } from '@entities/category';
import { useCategoryStore } from '@store/useCategoryStore';
import { useEffect } from 'react';

export default function CategoriesCards() {
    const { categories, getCategories } = useCategoryStore((state) => state);

    const sortedCategories = categories.sort(
        (a: Category, b: Category) => a.popularity - b.popularity
    );

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <section
            id="categories"
            className="p-4 bg-white rounded-xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {sortedCategories.map((category: Category) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                    />
                ))}
            </div>
        </section>
    );
}
