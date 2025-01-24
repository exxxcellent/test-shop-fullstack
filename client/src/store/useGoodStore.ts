import { GoodStore } from '../shared/types/good-store.interface';
import { create } from 'zustand';
import { goods } from '../utils/mocks/goods';

export const useGoodStore = create<GoodStore>((set) => ({
    goods: [...goods],
    selectedGood: null,
    setSelectedGood: (good) => set({ selectedGood: good }),
}));
