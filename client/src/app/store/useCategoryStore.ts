import api from '@config/axios';
import { Category } from '@entities/category';
import { ApiResponse, CategoryStore } from '@shared/types';
import { create } from 'zustand';

export const useCategoryStore = create<CategoryStore>((set) => ({
    selectedCategory: null,
    categories: [],
    getCategories: async () => {
        const response = await api.get<ApiResponse<Category[]>>('/category');
        const { data } = response.data;
        set(() => ({
            categories: [...data],
        }));
        return data;
    },
    getSubcategories: async (category) => {
        set(() => ({
            categories: [],
        }));
        const response = await api.get<ApiResponse<Category[]>>(
            `/category/${category}/categories`
        );
        const { data } = response.data;
        set(() => ({
            categories: data[0].subcategories,
            selectedCategory: data[0].subcategories[0],
        }));
        return data;
    },
    setSelectedCategory: (category) => {
        set({
            selectedCategory: category,
        });
    },
}));
