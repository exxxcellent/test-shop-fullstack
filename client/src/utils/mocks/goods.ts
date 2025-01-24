import { Good } from '../../shared/types/good.interface';

export const goods: Good[] = new Array(6).fill(0).map((_, index) => ({
    title: `Название товара`,
    description: `Длинное описание-рыба, чтобы посмотреть как выглядит описание с больше, чем одной строкой, хоть такое и случается довольно редко`,
    price: 1000 * ++index,
}));
