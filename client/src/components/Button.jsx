// Two variants. Solid is the single primary action on a page; outline is for
// repeated actions such as Add buttons in a product grid, where twelve solid
// buttons would shout.
const VARIANTS = {
    solid: 'bg-accent text-on-accent hover:bg-accent-strong',
    outline: 'border border-border text-text hover:border-stone hover:bg-surface',
};

// `as` lets a navigation action render as a router Link while keeping the
// button styling. An <a> may not contain a <button>, so wrapping this
// component in a Link would be invalid HTML and would confuse screen readers.
const Button = ({
    children,
    as: Component = 'button',
    variant = 'solid',
    fullWidth = false,
    className = '',
    ...props
}) => {
    // type only means anything on a real <button>; putting it on an anchor is
    // invalid. Spread after so a caller can still pass type="submit".
    const typeProp = Component === 'button' ? { type: 'button' } : {};

    return (
        <Component
            {...typeProp}
            className={`inline-flex justify-center items-center gap-2 px-7 py-3.5 rounded-full
                        font-medium text-[0.95rem] cursor-pointer
                        transition-[background-color,border-color,transform] duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${VARIANTS[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Button;
