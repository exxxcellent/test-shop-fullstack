import { Link } from 'react-router';

interface CategoryProps {
    title: string;
}

export default function Category({ title }: CategoryProps) {
    return (
        <Link
            to={`/category/${title.toLowerCase()}`}
            className="flex flex-col gap-2 items-center justify-center bg-gray-secondary p-[9px] rounded-[20px]">
            <div className="h-40 w-40 bg-gray-primary rounded-[11px]">
                {/* image */}
            </div>
            <h2 className="text-xl font-bold text-text-secondary">{title}</h2>
        </Link>
    );
}
