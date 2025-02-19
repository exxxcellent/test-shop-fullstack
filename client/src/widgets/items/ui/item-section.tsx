import { Item, ItemInfo, ItemSlider } from '@entities/item';
import { Button } from '@shared/ui';

interface ItemSectionProps {
    item: Item;
}

export default function ItemSection({ item }: ItemSectionProps) {
    const buttonSize = window.innerWidth <= 392 ? 'lg' : 'md';

    return (
        <section
            id="item"
            className="w-full bg-gray-secondary rounded-t-[24px] flex flex-col lg:flex-row gap-5 px-4 xl:px-0">
            <div className="bg-white lg:bg-transparent py-3 rounded-[24px] lg:w-1/2 max-lg:overflow-hidden h-max">
                <ItemSlider />
                <p className="text-2xl font-bold text-text-secondary px-2 lg:hidden">
                    {item?.price} ₽
                </p>
            </div>
            <div className="flex flex-col gap-5 flex-1 justify-between lg:justify-start pb-5">
                <p className="text-2xl font-bold text-text-secondary px-4 py-[10px] bg-white rounded-[20px] hidden lg:block">
                    {item?.price} ₽
                </p>
                <ItemInfo item={item} />
                <div className="">
                    {item.amount === 0 && (
                        <Button
                            title="Нет в наличии"
                            disabled
                            size={buttonSize}
                        />
                    )}
                    {item.amount !== 0 && (
                        <Button
                            to={`/order/create/${item.id}`}
                            title="Купить"
                            className="w-full"
                            size={buttonSize}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
