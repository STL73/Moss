import FilterBarA from './FilterBarA';
import FilterBarB from './FilterBarB';
import { useVariant } from '../hooks/useVariant';

/**
 * TEMPORARY dispatcher. See ProductCard.jsx for the reasoning. Production
 * always renders A.
 */
const FilterBar = (props) => {
    const variant = useVariant();

    if (import.meta.env.DEV && variant === 'b') return <FilterBarB {...props} />;
    return <FilterBarA {...props} />;
};

export default FilterBar;
