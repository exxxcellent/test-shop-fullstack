import { useGoodStore } from '../store/useGoodStore';
import Header from '../widgets/header';
import Breadcrumb from '../widgets/breadcrumb';
import Goods from '../widgets/goods';
import GoodDrawer from '../shared/ui/good-drawer';

export default function CategoryPage() {
    const selectedGood = useGoodStore((state) => state.selectedGood);
    const setSelectedGood = useGoodStore((state) => state.setSelectedGood);

    return (
        <>
            <Header />
            <Breadcrumb />
            <Goods />
            <GoodDrawer
                good={selectedGood}
                open={!!selectedGood}
                onClose={() => setSelectedGood(null)}
            />
        </>
    );
}
