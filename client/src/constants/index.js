import { FaFacebookF, FaXTwitter, FaInstagram, FaTiktok } from 'react-icons/fa6';

// Single source for the details shown in the footer and on the contact page,
// so the two can never drift apart.
export const contactEmail = 'customer@mossart.com';
export const contactPhone = '+44 7700 900142';
export const contactTel = `tel:${contactPhone.replace(/\s/g, '')}`;

// Every entry must resolve to something that exists. A "Journal" link used to
// sit here pointing at /#story, an anchor no section ever rendered.
export const navLinks = [
    { to: '/products', label: 'Shop' },
    { to: '/#about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];

// PLACEHOLDER — none of these figures have been verified with the client.
// "3k Customers" in particular is a claim about the business, not a design
// detail, and publishing it unverified is a commercial risk rather than a
// cosmetic one. The suffixes are claims too: "Ethically foraged" and "UK-wide
// delivery" both need confirming.
//
// Before launch: replace with numbers the client can substantiate, or delete
// the stats band from Hero entirely. Hero renders a visible marker over these
// in development so they cannot be forgotten; that marker is stripped from
// production builds, so this comment is the only thing standing between these
// values and a live site.
export const PLACEHOLDER_STATS = [
    { value: '12', label: 'Species', suffix: 'Ethically foraged' },
    { value: '200+', label: 'Pieces', suffix: 'Made by hand' },
    { value: '3k', label: 'Customers', suffix: 'UK-wide delivery' },
];

export const footerLinks = [
    {
        title: 'Collections',
        links: [
            { name: 'Moss Pots', to: '/products?category=moss-pots' },
            { name: 'Wall Art', to: '/products?category=wall-art' },
            { name: 'Wreaths', to: '/products?category=wreaths' },
            { name: 'Planters', to: '/products?category=planters' },
        ],
    },
    {
        title: 'Help',
        links: [
            { name: 'About us', to: '/#about' },
            { name: 'FAQs', to: '/contact#faq' },
            { name: 'Delivery', to: '/contact#delivery' },
            { name: 'Returns', to: '/contact#returns' },
        ],
    },
    {
        title: 'Get in touch',
        links: [
            { name: contactEmail, to: `mailto:${contactEmail}` },
            { name: contactPhone, to: contactTel },
        ],
    },
];

export const socialMedia = [
    { Icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com' },
    { Icon: FaXTwitter, label: 'X', href: 'https://x.com' },
    { Icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' },
    { Icon: FaTiktok, label: 'TikTok', href: 'https://tiktok.com' },
];
