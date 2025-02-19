import { Item } from '../types/item.interface';
import invoice from '@icons/invoice.svg';

interface ItemPreviewProps {
    item: Item;
}

export default function ItemPreview({ item }: ItemPreviewProps) {
    return (
        <div className="flex items-center gap-4 bg-white rounded-[20px] py-[10px] px-4">
            <div className="bg-accent-primary/10 border border-accent-primary rounded-full p-[10px]">
                <img
                    src={invoice}
                    alt="invoice"
                    className="w-6 h-6"
                />
            </div>
            <div>
                <div className="text-text-secondary text-2xl font-semibold">
                    {item.price} ₽
                </div>
                <h3 className="text-text-secondary">{item.title}</h3>
            </div>
        </div>
    );
}
