import { create } from 'zustand';
import { ApiResponse, ItemStore } from '@shared/types';
import { Item } from '@entities/item';
import api from '@config/axios';

export const useItemStore = create<ItemStore>((set) => ({
    items: [],
    getItemById: async (id) => {
        const response = await api.get<ApiResponse<Item>>(`/item/${id}`);
        return response.data;
    },
    getItemsByCategory: async (category) => {
        const response = await api.get<ApiResponse<Item[]>>(
            `/item/${category.title}/items`
        );
        const { data } = response.data;
        set(() => ({
            items: data,
        }));
    },
}));
