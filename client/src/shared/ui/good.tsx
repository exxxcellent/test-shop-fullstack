import type { Good } from '../types/good.interface';
import { useGoodStore } from '../../store/useGoodStore';
import Button from './button';

interface GoodProps {
    good: Good;
}

export default function Good({ good }: GoodProps) {
    const setSelectedGood = useGoodStore((state) => state.setSelectedGood);

    const onSelectHandler = () => {
        setSelectedGood(good);
    };

    return (
        <div className="flex flex-col gap-2 justify-center bg-gray-secondary p-[9px] rounded-[20px]">
            <div className="h-40 w-40 bg-gray-primary rounded-[11px]">
                {/* image */}
            </div>
            <div>
                <h2 className="text-xl font-semibold text-text-secondary">
                    {good.title}
                </h2>
                <p className="text-base text-text-tertiary truncate">
                    {good.description}
                </p>
            </div>
            <Button
                title={`${good.price} RUB`}
                leftIcon={
                    <img
                        src="/src/assets/icons/add-cart.svg"
                        alt=""
                    />
                }
                onClick={onSelectHandler}
                size="md"
            />
        </div>
    );
}
