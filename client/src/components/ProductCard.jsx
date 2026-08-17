import ProductCardA from './ProductCardA';
import ProductCardB from './ProductCardB';
import { useVariant } from '../hooks/useVariant';

/**
 * TEMPORARY dispatcher, so the two card designs can be compared on the real
 * product grid rather than side by side in isolation. A card is judged in a row
 * of eleven others, against real photography, at the real column width — none of
 * which a preview shows.
 *
 * Production always renders A, the version that ships: Vite compiles
 * import.meta.env.DEV to a literal false, so the branch collapses and the hook
 * is never consulted. B is still bundled until one of them is deleted, which is
 * the cost of comparing on the real site and is why this is temporary.
 *
 * Consumers import './ProductCard' exactly as before, so nothing else in the
 * app — or in the tests — knows a comparison is happening.
 */
const ProductCard = (props) => {
    // Hooks cannot be called conditionally, so this runs in both builds and the
    // branch below is what the minifier removes.
    const variant = useVariant();

    if (import.meta.env.DEV && variant === 'b') return <ProductCardB {...props} />;
    return <ProductCardA {...props} />;
};

export default ProductCard;
