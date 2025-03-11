export interface Category {
    id: string;
    title: string;
    popularity: number;
    parentId: string | null;
    subcategories: Category[];
    createdAt: Date;
    updatedAt: Date;
    _count?: {
        subcategories: number;
    };
}
