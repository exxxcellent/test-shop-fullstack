export interface Item {
    id: string;
    title: string;
    description?: string;
    price: number;
    categoryId: string;
    amount: number;
    imageUrl: string | null;
}
