import CartDrawerA from './CartDrawerA';
import CartDrawerB from './CartDrawerB';
import { useVariant } from '../hooks/useVariant';

/**
 * TEMPORARY dispatcher. See ProductCard.jsx for the reasoning. Production
 * always renders A.
 */
const CartDrawer = () => {
    const variant = useVariant();

    if (import.meta.env.DEV && variant === 'b') return <CartDrawerB />;
    return <CartDrawerA />;
};

export default CartDrawer;
