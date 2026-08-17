import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import Photo from './Photo';
import { formatPrice } from '../utils/formatPrice';

// What the photograph is actually drawn at, not what the card is. The card
// carries 12px of padding on each side, and leaving that out was enough to push
// a 390px phone from 954 device pixels to 1026 — over the 960 rung and onto the
// 1400 file, which is an 83 kB miss per card for the sake of 24px of arithmetic.
//
// The widest case is the Products grid: three columns of a 1312px content width,
// less two 20px gaps, less the card padding, is 400px. FeaturedProducts runs
// four columns and so is narrower — one `sizes` covers both, and erring wide
// only ever costs a rung, never correctness.
const CARD_SIZES = '(min-width: 1440px) 400px, (min-width: 1024px) 28vw, (min-width: 640px) 44vw, calc(100vw - 72px)';

// The title link is stretched over the whole card with an ::after overlay, so
// the card is clickable without nesting the Add button inside an anchor —
// which would be invalid HTML and would break screen-reader navigation.
// The Add button sits above that overlay on its own stacking level.
const ProductCardA = ({ product, onAdd }) => {
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
        <Photo
            photo={product.images[0]}
            sizes={CARD_SIZES}
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
                        // No colour change on hover. The card already answers
                        // the pointer twice — it lifts 6px and its border moves
                        // to --stone — and those describe the whole card, which
                        // is what the ::after overlay actually makes clickable.
                        // Tinting only the title implied the title was the link
                        // and the rest of the card was not.
                        //
                        // The price beside it is permanently --accent, so a
                        // title that also turned accent on hover collapsed the
                        // one row on the card that carries a hierarchy: what
                        // the thing is, and what it costs, became the same
                        // colour at the moment of interest.
                        className="after:absolute after:inset-0 after:rounded-2xl"
                    >
                        {product.name}
                    </Link>
                </h3>
                <span className="text-accent font-medium">{formatPrice(product.price)}</span>
            </div>
            <p className="text-xs text-text-muted mt-1.5 italic">{product.species}</p>
            {/* Sized at 152px rather than fitting its label. At 65px it read as
                an afterthought in a card this large; full width made it heavier
                than the photograph and, on a phone where cards already span the
                screen, a very wide bar for a two-letter word. This balances the
                price on the opposite side and closes the gap under it.

                Resting state is --control, a mix of the card's own colour with
                18% accent, ringed in --accent. It used to be transparent with a
                quiet grey border, and the hover only moved the background by
                1.13:1 in dark and 1.04:1 in light — no visible change at all,
                which is exactly how it was reported. Rest to hover is now
                5.87:1 and 4.98:1. */}
            <button
                type="button"
                onClick={() => onAdd(product)}
                aria-label={`Add ${product.name} to basket`}
                className="relative z-10 mt-4 ml-auto flex w-fit min-w-38 items-center justify-center
                           min-h-11 px-5 rounded-full text-xs font-medium cursor-pointer
                           border border-accent bg-control text-text
                           hover:bg-accent hover:text-on-accent
                           transition-colors duration-200"
            >
                Add
            </button>
        </div>
    </motion.div>
    );
};

export default ProductCardA;
