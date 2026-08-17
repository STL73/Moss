import { useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { LuX } from 'react-icons/lu';
import { useCart } from '../hooks/useCart';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { formatPrice } from '../utils/formatPrice';
import Button from './Button';
import Photo from './Photo';

const CartDrawer = () => {
    const { items, total, itemCount, drawerOpen, closeDrawer, removeItem } = useCart();

    // Focus in on open, contained while open, back to the trigger on close.
    const panelRef = useFocusTrap(drawerOpen);

    // Escape closes, and the body must not scroll behind the panel.
    useEffect(() => {
        if (!drawerOpen) return;
        const onKeyDown = (event) => {
            if (event.key === 'Escape') closeDrawer();
        };
        document.addEventListener('keydown', onKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
        };
    }, [drawerOpen, closeDrawer]);

    return (
        <AnimatePresence>
            {drawerOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeDrawer}
                        className="fixed inset-0 bg-black/55 z-40"
                    />
                    <motion.aside
                        ref={panelRef}
                        tabIndex={-1}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Basket"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50
                                   bg-surface border-l border-border flex flex-col outline-none"
                    >
                        <header className="flex justify-between items-center p-6 border-b border-border">
                            <h2 className="font-display text-xl">
                                Basket <span className="text-text-muted text-sm">({itemCount})</span>
                            </h2>
                            <button
                                type="button"
                                onClick={closeDrawer}
                                aria-label="Close basket"
                                className="size-11 grid place-items-center rounded-full
                                           text-text-muted hover:text-text cursor-pointer
                                           transition-colors duration-200"
                            >
                                <LuX size={20} />
                            </button>
                        </header>

                        <div aria-live="polite" className="sr-only">
                            {itemCount} items in basket, total {formatPrice(total)}
                        </div>

                        {/* The basket icon in Nav opens this unconditionally, so
                            an empty basket has to say so. Without this branch the
                            panel showed a blank space between the header and a
                            "Subtotal £0.00" footer, above a button leading to
                            /cart — which is also empty. /cart had an empty state
                            from the start; the drawer never got one. */}
                        {items.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center gap-5 p-6 text-center">
                                <p className="text-text-muted">Your basket is empty.</p>
                                <Button as={Link} to="/products" onClick={closeDrawer} variant="outline">
                                    Browse the collection
                                </Button>
                            </div>
                        ) : (
                        <ul className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
                            {items.map((item) => (
                                <li key={item.id} className="flex gap-4 items-center">
                                    <Photo
                                        photo={item.images[0]}
                                        // Fixed 64px box at every breakpoint, so
                                        // the 240px variant covers it to 3x.
                                        sizes="64px"
                                        alt={item.name}
                                        className="size-16 rounded-lg object-cover shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{item.name}</p>
                                        <p className="text-xs text-text-muted mt-0.5">
                                            {item.quantity} × {formatPrice(item.price)}
                                        </p>
                                    </div>
                                    {/* 16px tall as a bare text button — the smallest
                                        target on the site, and the one where a
                                        mis-tap costs the most. The negative margin
                                        absorbs the new padding so the row does not
                                        shift. */}
                                    <button
                                        type="button"
                                        onClick={() => removeItem(item.id)}
                                        aria-label={`Remove ${item.name}`}
                                        className="inline-flex items-center min-h-11 px-2 -mx-2
                                                   text-xs text-text-muted hover:text-text cursor-pointer
                                                   transition-colors duration-200"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                        )}

                        {/* Hidden when empty, along with the subtotal. A £0.00
                            total and a button to a second empty page is not a
                            checkout path, it is a dead end. */}
                        {items.length > 0 && (
                            <footer className="p-6 border-t border-border">
                                <div className="flex justify-between mb-5">
                                    <span className="text-text-muted">Subtotal</span>
                                    <span className="text-accent font-medium">{formatPrice(total)}</span>
                                </div>
                                <Button as={Link} to="/cart" onClick={closeDrawer} fullWidth>
                                    View basket
                                </Button>
                            </footer>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
