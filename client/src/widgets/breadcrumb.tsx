import { Link } from 'react-router';

export default function Breadcrumb() {
    return (
        <div
            id="breadcrumb"
            className="px-5">
            <Link
                className="flex items-center gap-2"
                to="/">
                <img
                    src="/src/assets/icons/arrow-left.svg"
                    alt="arrow-left"
                    className="w-6 h-6"
                />
                <p className="text-base font-bold text-text-tertiary">Назад</p>
            </Link>
        </div>
    );
}
