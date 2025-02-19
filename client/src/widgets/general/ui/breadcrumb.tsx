import { useNavigate } from 'react-router';
import arrowLeft from '@icons/arrow-left.svg';

export default function Breadcrumb() {
    const router = useNavigate();

    const toBackwardLink = () => {
        router(-1);
    };

    return (
        <div
            id="breadcrumb"
            className="px-4">
            <a
                className="flex items-center gap-2 cursor-pointer"
                onClick={toBackwardLink}>
                <img
                    src={arrowLeft}
                    alt="arrow-left"
                    className="w-6 h-6"
                />
                <p className="text-base font-bold text-text-tertiary hover:text-accent-primary duration-150">
                    Назад
                </p>
            </a>
        </div>
    );
}
