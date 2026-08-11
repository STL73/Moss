import { categories } from '../data/products';

const FilterBar = ({ active, onCategoryChange, sort, onSortChange, count }) => (
    <div className="flex justify-between items-center gap-6 flex-wrap">
        <div className="flex gap-2.5 flex-wrap">
            {categories.map((category) => {
                const isActive = category.slug === active;
                return (
                    <button
                        key={category.slug}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => onCategoryChange(category.slug)}
                        className={`px-4 py-2 rounded-full text-sm cursor-pointer border
                                    transition-colors duration-200 ${
                            isActive
                                ? 'bg-accent text-on-accent border-accent font-medium'
                                : 'border-border text-text-muted hover:text-text hover:border-stone'
                        }`}
                    >
                        {category.name}
                    </button>
                );
            })}
        </div>

        <div className="flex items-center gap-5">
            <span className="text-sm text-text-muted">{count} pieces</span>
            <label htmlFor="sort" className="sr-only">Sort by</label>
            <select
                id="sort"
                value={sort}
                onChange={(event) => onSortChange(event.target.value)}
                className="bg-transparent border border-border rounded-full px-4 py-2
                           text-sm text-text cursor-pointer hover:border-stone
                           transition-colors duration-200"
            >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
            </select>
        </div>
    </div>
);

export default FilterBar;
