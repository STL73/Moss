import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { LuX } from 'react-icons/lu';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import Button from './Button';

const CartDrawer = () => {
    const { items, total, itemCount, drawerOpen, closeDrawer, removeItem } = useCart();
    const panelRef = useRef(null);

    // Escape closes, the body must not scroll, and focus moves into the panel
    // so keyboard users are not left behind on the page.
    useEffect(() => {
        if (!drawerOpen) return;
        const onKeyDown = (event) => {
            if (event.key === 'Escape') closeDrawer();
        };
        document.addEventListener('keydown', onKeyDown);
        document.body.style.overflow = 'hidden';
        panelRef.current?.focus();
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
                                className="p-2 rounded-full text-text-muted hover:text-text cursor-pointer
                                           transition-colors duration-200"
                            >
                                <LuX size={20} />
                            </button>
                        </header>

                        <div aria-live="polite" className="sr-only">
                            {itemCount} items in basket, total {formatPrice(total)}
                        </div>

                        <ul className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
                            {items.map((item) => (
                                <li key={item.id} className="flex gap-4 items-center">
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="size-16 rounded-lg object-cover shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{item.name}</p>
                                        <p className="text-xs text-text-muted mt-0.5">
                                            {item.quantity} × {formatPrice(item.price)}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeItem(item.id)}
                                        aria-label={`Remove ${item.name}`}
                                        className="text-xs text-text-muted hover:text-text cursor-pointer
                                                   transition-colors duration-200"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <footer className="p-6 border-t border-border">
                            <div className="flex justify-between mb-5">
                                <span className="text-text-muted">Subtotal</span>
                                <span className="text-accent font-medium">{formatPrice(total)}</span>
                            </div>
                            <Button as={Link} to="/cart" onClick={closeDrawer} fullWidth>
                                View basket
                            </Button>
                        </footer>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
