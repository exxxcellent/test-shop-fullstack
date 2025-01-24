import Category from '../shared/ui/category';

export default function Categories() {
    return (
        <section
            id="categories"
            className="px-5">
            <h1 className="text-2xl font-bold text-text-secondary mb-2">
                Выберите категорию
            </h1>
            <div className="grid grid-cols-2 gap-2">
                {new Array(6).fill(0).map((_, index) => (
                    <Category
                        key={index}
                        title={`Name`}
                    />
                ))}
            </div>
        </section>
    );
}
