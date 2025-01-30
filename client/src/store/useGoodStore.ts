import { GoodStore } from '../shared/types/good-store.interface';
import { create } from 'zustand';
import { goods } from '../utils/mocks/goods';

export const useGoodStore = create<GoodStore>((set) => ({
    goods: [...goods],
    selectedGood: null,
    setSelectedGood: (good) => set({ selectedGood: good }),
    getGoods: async () => {
        const response = await fetch(import.meta.env.VITE_API_URL);
        const data = await response.json();
        return data;
    },
}));
