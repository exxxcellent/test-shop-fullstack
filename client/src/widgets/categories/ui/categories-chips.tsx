import { Category, CategoryChip } from '@entities/category';
import { useCategoryStore } from '@store/useCategoryStore';
import { useItemStore } from '@store/useItemStore';
import { useEffect } from 'react';
import { useParams } from 'react-router';

export default function CategoriesChips() {
    const {
        categories,
        getSubcategories,
        setSelectedCategory,
        selectedCategory,
    } = useCategoryStore((state) => state);
    const { getItemsByCategory } = useItemStore((state) => state);

    const params = useParams();

    const getItems = async (category: Category) => {
        getItemsByCategory(category);
        setSelectedCategory(category);
    };

    useEffect(() => {
        getSubcategories(params.category as string);
    }, []);

    return (
        <div className="flex items-center gap-[10px] px-4 overflow-x-auto scrollbar">
            {categories.map((category: Category) => (
                <CategoryChip
                    key={category.id}
                    category={category}
                    defaultChecked={category.id === selectedCategory?.id}
                    onChange={() => getItems(category)}
                />
            ))}
        </div>
    );
}
