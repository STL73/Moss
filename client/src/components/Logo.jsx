// Cut glass bowl with a moss cushion on the base and a droplet in the opening.
// Drawn entirely in currentColor so one component serves both themes.
// The moss base uses the circle's inner radius (9.3 vs the outer 10.2) so it
// meets the stroke exactly at every size.
const Logo = ({ size = 32, className = '' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        role="img"
        aria-label="MossArt"
        className={className}
    >
        <path
            d="M26.2 16.5 A10.2 10.2 0 1 1 16 6.3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
        />
        <path
            d="M9 18 Q9.9 13.8 11.9 15.9 Q13.2 12 15.2 15 Q16.8 11.4 18.8 14.8
               Q20.6 13 21.9 16.4 Q22.7 15.4 23 18 Q23.9 19.4 24.14 21
               A9.3 9.3 0 0 1 7.86 21 Q8.1 19.4 9 18 Z"
            fill="currentColor"
        />
        <circle cx="21.6" cy="9.6" r="2" fill="currentColor" opacity="0.85" />
    </svg>
);

export default Logo;
