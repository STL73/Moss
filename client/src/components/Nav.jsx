import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { LuMenu, LuX, LuShoppingBasket } from 'react-icons/lu';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../hooks/useCart';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { navLinks } from '../constants';

const Nav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { itemCount, openDrawer } = useCart();

    // The panel claims aria-modal, so focus has to actually behave modally.
    const menuRef = useFocusTrap(menuOpen);

    // Escape closes the menu, and the body must not scroll behind it.
    useEffect(() => {
        if (!menuOpen) return;
        const onKeyDown = (event) => {
            if (event.key === 'Escape') setMenuOpen(false);
        };
        document.addEventListener('keydown', onKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    return (
        <>
        <header className="padding-x py-6 w-full sticky top-0 z-30 bg-bg/85 backdrop-blur-md border-b border-border">
            <nav className="max-container flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2.5 text-accent">
                    <Logo size={34} />
                    <span className="font-display text-xl font-medium text-text">MossArt</span>
                </Link>

                <ul className="flex-1 flex justify-center items-center gap-12 max-lg:hidden">
                    {navLinks.map((item) => (
                        <li key={item.label}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `text-[0.95rem] transition-colors duration-200 ${
                                        isActive ? 'text-text' : 'text-text-muted hover:text-text'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-1">
                    <ThemeToggle />
                    <button
                        type="button"
                        onClick={openDrawer}
                        aria-label={`Open basket, ${itemCount} items`}
                        className="size-11 grid place-items-center rounded-full
                                   text-text-muted hover:text-text
                                   transition-colors duration-200 cursor-pointer"
                    >
                        {/* The count is anchored to the icon rather than to the
                            button: the button is now a 44px tap area, and a
                            badge pinned to its corner would float away from the
                            basket it is counting. */}
                        <span className="relative grid place-items-center">
                            <LuShoppingBasket size={19} />
                            {itemCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 rounded-full
                                                 bg-accent text-on-accent text-[10px] font-semibold
                                                 grid place-items-center">
                                    {itemCount}
                                </span>
                            )}
                        </span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                        className="size-11 grid place-items-center rounded-full
                                   text-text-muted hover:text-text
                                   transition-colors duration-200 cursor-pointer lg:hidden"
                    >
                        <LuMenu size={20} />
                    </button>
                </div>
            </nav>
        </header>

        {/* Outside the header on purpose. The header carries backdrop-blur, and
            a backdrop-filter makes an element the containing block for any
            fixed-position descendant — so in here, "fixed top-0 bottom-0"
            resolved against the header's own 86px box instead of the viewport.
            The panel's background became a strip across the top of the screen
            and the links rendered below it with nothing behind them. */}
        <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        />
                        <motion.div
                            ref={menuRef}
                            tabIndex={-1}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Site menu"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm z-50
                                       bg-surface border-l border-border p-6 lg:hidden outline-none"
                        >
                            <button
                                type="button"
                                onClick={() => setMenuOpen(false)}
                                aria-label="Close menu"
                                className="ml-auto size-11 grid place-items-center
                                           text-text-muted hover:text-text cursor-pointer"
                            >
                                <LuX size={22} />
                            </button>
                            <ul className="mt-8 flex flex-col gap-6">
                                {navLinks.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            to={item.to}
                                            onClick={() => setMenuOpen(false)}
                                            className="font-display text-2xl text-text"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </>
                )}
        </AnimatePresence>
        </>
    );
};

export default Nav;
