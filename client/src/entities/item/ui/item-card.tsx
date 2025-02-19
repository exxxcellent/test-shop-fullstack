import { Item } from '../types/item.interface';
import addCart from '@icons/add-cart.svg';
import packageOutOfStock from '@icons/package-out-of-stock.svg';
import { Button } from '@shared/ui';
import { Link, useParams } from 'react-router';

interface ItemCardProps {
    item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
    const params = useParams();

    const icon =
        item.amount !== 0 ? (
            <img
                src={addCart}
                alt="add cart"
            />
        ) : (
            <img
                src={packageOutOfStock}
                alt="add cart"
            />
        );

    return (
        <Link
            to={`/category/${params.category}/product/${item.id}`}
            className="flex flex-col gap-2 justify-center bg-gray-secondary p-[9px] rounded-[20px] hover:bg-accent-primary/10 duration-150">
            <div className="min-h-40 min-w-40 h-full w-full bg-gray-primary rounded-[11px] self-center">
                {/* image */}
            </div>
            <div>
                <h2 className="text-xl font-semibold text-text-secondary">
                    {item.title}
                </h2>
                <p className="text-base text-text-tertiary truncate">
                    {item.description}
                </p>
            </div>
            <Button
                title={`${item.price} RUB`}
                leftIcon={icon}
                disabled={item.amount === 0}
                size="md"
            />
        </Link>
    );
}
