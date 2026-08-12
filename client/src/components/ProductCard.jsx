import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { formatPrice } from '../utils/formatPrice';

// The title link is stretched over the whole card with an ::after overlay, so
// the card is clickable without nesting the Add button inside an anchor —
// which would be invalid HTML and would break screen-reader navigation.
// The Add button sits above that overlay on its own stacking level.
const ProductCard = ({ product, onAdd }) => {
    const { search } = useLocation();

    return (
    <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6 }}
        className="card-surface relative p-3 h-full group
                   hover:border-stone transition-colors duration-300"
    >
        <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full aspect-square object-cover rounded-xl"
        />
        <div className="px-1 pt-4 pb-1">
            <div className="flex justify-between items-baseline gap-3">
                <h3 className="text-[0.95rem] font-medium">
                    <Link
                        // Carrying the query forward is what lets the product
                        // page send the customer back to the list they were
                        // actually browsing, filters and sort intact.
                        to={{ pathname: `/products/${product.slug}`, search }}
                        className="after:absolute after:inset-0 after:rounded-2xl
                                   group-hover:text-accent transition-colors duration-200"
                    >
                        {product.name}
                    </Link>
                </h3>
                <span className="text-accent font-medium">{formatPrice(product.price)}</span>
            </div>
            <p className="text-xs text-text-muted mt-1.5 italic">{product.species}</p>
            <button
                type="button"
                onClick={() => onAdd(product)}
                aria-label={`Add ${product.name} to basket`}
                className="relative z-10 mt-4 ml-auto block px-5 py-2 rounded-full text-xs font-medium
                           border border-border-interactive text-text cursor-pointer
                           hover:border-accent hover:bg-raised transition-colors duration-200"
            >
                Add
            </button>
        </div>
    </motion.div>
    );
};

export default ProductCard;
