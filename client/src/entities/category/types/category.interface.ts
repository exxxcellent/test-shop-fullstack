export interface Category {
    id: string;
    title: string;
    popularity: number;
    parentId: string | null;
    subcategories: Category[];
}
