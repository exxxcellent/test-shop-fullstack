import { Item } from '../types/item.interface';
import ItemAccordion from './item-accordion';

interface ItemInfoProps {
    item: Item;
}
export default function ItemInfo({ item }: ItemInfoProps) {
    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold text-text-secondary">
                {item?.title}
            </h3>
            <ItemAccordion item={item} />
        </div>
    );
}
