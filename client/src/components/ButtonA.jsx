// Two variants. Solid is the single primary action on a page; outline is for
// repeated actions such as Add buttons in a product grid, where twelve solid
// buttons would shout.
const VARIANTS = {
    solid: 'bg-accent text-on-accent hover:bg-accent-strong',
    // Hover moves the border to --accent-strong, not --accent. The two tokens
    // were doing one job until 2026-08-17, and it was the wrong one: --accent is
    // also rendered as text (hover:text-accent below and in the footer, cart and
    // product cards), which caps how light it can be at 4.5:1 against the page.
    // A border wants the opposite — the further it is from the resting
    // --border-interactive the more visible the hover, and it carries no text.
    // Splitting them lets --accent be a readable brand colour and
    // --accent-strong be a loud one.
    outline: 'border border-border-interactive text-text hover:border-accent-strong hover:bg-surface',
};

// `as` lets a navigation action render as a router Link while keeping the
// button styling. An <a> may not contain a <button>, so wrapping this
// component in a Link would be invalid HTML and would confuse screen readers.
const ButtonA = ({
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

export default ButtonA;
