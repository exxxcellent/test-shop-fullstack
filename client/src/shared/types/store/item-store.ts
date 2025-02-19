import { Item } from '@entities/item';
import { ApiResponse } from '../api/api-response.interface';
import { Category } from '@entities/category';

export interface ItemStore {
    items: Item[];
    getItemById: (id: string) => Promise<ApiResponse<Item>>;
    getItemsByCategory: (category: Category) => void;
}
