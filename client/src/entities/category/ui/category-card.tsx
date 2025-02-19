import { Link } from 'react-router';
import { Category } from '../types/category.interface';
import { useCategoryStore } from '@store/useCategoryStore';

interface CategoryCardProps {
    category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    const { setSelectedCategory } = useCategoryStore((state) => state);

    return (
        <Link
            onClick={() => setSelectedCategory(category)}
            to={`/category/${category.title.toLowerCase()}`}
            className="flex flex-col gap-2 items-center justify-center bg-gray-secondary hover:bg-accent-primary/10 duration-150 p-[9px] rounded-[20px]">
            <div className="h-40 w-40 bg-gray-primary rounded-[11px]">
                {/* image */}
            </div>
            <h2 className="text-xl font-bold text-text-secondary capitalize text-center">
                {category.title}
            </h2>
        </Link>
    );
}
