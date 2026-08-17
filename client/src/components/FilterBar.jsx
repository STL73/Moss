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
                        className={`inline-flex items-center min-h-11 px-4 rounded-full
                                    text-sm cursor-pointer border
                                    transition-colors duration-200 ${
                            isActive
                                ? 'bg-accent text-on-accent border-accent font-medium'
                                : 'border-border-interactive text-text-muted hover:text-text hover:border-accent-strong'
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
            {/* The popup list is painted by the browser, not by this element, and
                it takes its colours from the <option>s. With the control set to
                bg-transparent the options had no background of their own, so
                Chrome drew a default light list and put the near-white --text on
                top of it — unreadable except for the highlighted row. The control
                itself keeps the page colour, so it still looks unfilled. */}
            <select
                id="sort"
                value={sort}
                onChange={(event) => onSortChange(event.target.value)}
                className="select-themed bg-bg border border-border-interactive rounded-full
                           min-h-11 px-4 text-sm text-text cursor-pointer hover:border-accent-strong
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
