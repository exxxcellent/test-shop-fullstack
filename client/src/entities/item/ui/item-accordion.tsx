import { twMerge } from 'tailwind-merge';
import { Item } from '../types/item.interface';
import { useState } from 'react';
import arrowDown from '@icons/arrow-down.svg';
import arrowUp from '@icons/arrow-up.svg';

interface ItemAccordionProps {
    item: Item;
}
export default function ItemAccordion({ item }: ItemAccordionProps) {
    const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

    const onToggleAccordionHandler = () => {
        setAccordionOpen(!accordionOpen);
    };

    return (
        <div className="flex flex-col">
            <div
                className={twMerge(
                    'text-xl text-text-tertiary mb-3 h-14 overflow-hidden duration-200 transition-all ease-linear',
                    accordionOpen ? 'h-full' : ''
                )}>
                {item?.description}
            </div>
            <button
                className="text-xl text-accent-primary flex items-center gap-1"
                onClick={onToggleAccordionHandler}>
                {accordionOpen ? 'свернуть' : 'больше'}
                {accordionOpen && (
                    <img
                        src={arrowDown}
                        alt="arrow-down"
                        className="w-6 h-6"
                    />
                )}
                {!accordionOpen && (
                    <img
                        src={arrowUp}
                        alt="arrow-up"
                        className="w-6 h-6"
                    />
                )}
            </button>
        </div>
    );
}
