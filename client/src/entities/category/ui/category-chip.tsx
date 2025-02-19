import { Category } from '../types/category.interface';

interface CategoryChipProps extends React.HTMLAttributes<HTMLDivElement> {
    category: Category;
}

export default function CategoryChip({
    category,
    onChange,
    defaultChecked,
}: CategoryChipProps) {
    return (
        <div className="bg-white px-[15px] py-[10px] rounded-[20px] border-l-gray-secondary border text-2xl text-text-secondary relative">
            <input
                id={category.id}
                className="category_chip hidden"
                type="radio"
                name="subcategory"
                value={category.parentId ? category.parentId : 'null'}
                defaultChecked={defaultChecked}
                onChange={onChange}
            />
            <label
                htmlFor={category.id}
                className="absolute left-0 top-0 w-full h-full rounded-[20px] border hover:bg-accent-primary/10 duration-150 cursor-pointer"></label>
            <span className="capitalize text-nowrap">{category.title}</span>
        </div>
    );
}
