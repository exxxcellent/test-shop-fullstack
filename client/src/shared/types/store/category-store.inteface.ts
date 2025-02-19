import { Category } from '@entities/category';

export interface CategoryStore {
    selectedCategory: Category | null;
    categories: Category[];
    getCategories: () => void;
    getSubcategories: (title: string) => Promise<Category[]>;
    setSelectedCategory: (category: Category | null) => void;
}
