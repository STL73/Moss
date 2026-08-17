import ButtonA from './ButtonA';
import ButtonB from './ButtonB';
import { useVariant } from '../hooks/useVariant';

/**
 * TEMPORARY dispatcher. See ProductCard.jsx for the reasoning; the same applies
 * here, and this one matters more because Button appears on every route, so its
 * press and focus behaviour can only really be judged by using the site rather
 * than by looking at a button.
 *
 * Production always renders A: import.meta.env.DEV is a literal false in a
 * build, so the branch collapses and B is unreachable.
 */
const Button = (props) => {
    const variant = useVariant();

    if (import.meta.env.DEV && variant === 'b') return <ButtonB {...props} />;
    return <ButtonA {...props} />;
};

export default Button;
