import { Link } from 'react-router';
import { Category } from '../types/category.interface';
import { useCategoryStore } from '@store/useCategoryStore';

interface CategoryPopularProps {
    category: Category;
}

export default function CategoryPopular({ category }: CategoryPopularProps) {
    const { setSelectedCategory } = useCategoryStore((state) => state);

    return (
        <Link
            onClick={() => setSelectedCategory(category)}
            to={`/category/${category.title.toLowerCase()}`}
            className="flex flex-col gap-5 items-center justify-center flex-shrink-0 font-semibold hover:text-accent-primary duration-150">
            <img src="/src/assets/icons/sbp.svg" />
            <h3 className="capitalize">{category.title}</h3>
        </Link>
    );
}
