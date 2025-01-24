import type { Good } from '../types/good.interface';

export interface GoodStore {
    goods: Good[];
    selectedGood: Good | null;
    setSelectedGood: (good: Good | null) => void;
}
