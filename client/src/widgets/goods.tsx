import { useGoodStore } from '../store/useGoodStore';
import Good from '../shared/ui/good';

export default function Goods() {
    const goods = useGoodStore((state) => state.goods);

    return (
        <section
            id="goods"
            className="px-5">
            <h1 className="text-2xl font-bold text-text-secondary mb-2">
                Выберите товар
            </h1>
            <ul className="grid grid-cols-2 gap-2">
                {goods.map((good) => (
                    <li>
                        <Good
                            key={good.title}
                            good={good}
                        />
                    </li>
                    
                ))}
            </ul>
        </section>
    );
}
