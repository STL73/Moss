import { motion } from 'motion/react';
import { useMotionPreset } from '../hooks/useMotionPreset';

/**
 * A section arriving as it is scrolled to.
 *
 * One component rather than the props repeated at each call site, so the two
 * home sections cannot drift apart and so there is one place to delete this
 * from if it turns out to be a mistake.
 *
 * `once: true` is the important prop. A section that re-animates every time it
 * passes the viewport turns a page into a slideshow and makes scrolling back up
 * feel broken.
 *
 * `amount: 0.2` fires when a fifth of the section is showing rather than
 * waiting for all of it — a full-bleed section taller than the viewport would
 * otherwise never reach its own threshold and would never appear at all.
 *
 * Reduced motion needs nothing here: MotionConfig in RootLayout is set to
 * reducedMotion="user", which makes Motion snap this to its animate state
 * instead of tweening it.
 */
const Reveal = ({ children, className = '' }) => {
    const { duration, shift, ease } = useMotionPreset();

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: shift }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: duration / 1000, ease }}
        >
            {children}
        </motion.div>
    );
};

export default Reveal;
