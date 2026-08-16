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

// Replaced the invented figures on 2026-08-16 — 12 Species / 200+ Pieces /
// 3k Customers were never confirmed with the client, and "3k Customers" is a
// commercial claim about the business rather than a design detail. Nothing
// here needs the client's sign-off: these are properties of preserved moss,
// which is what the product is.
//
// The care list was removed from the hero paragraph and the footer at the same
// time. It used to appear in both, so putting it in this band as well would
// have said the same thing three times on one page. If you add it back to
// either, take it out of here.
export const HERO_CLAIMS = [
    { value: 'No', label: 'water', suffix: 'Preserved, not living' },
    { value: 'No', label: 'light', suffix: 'Happy in a dark hallway' },
    { value: 'No', label: 'upkeep', suffix: 'Nothing to do, for years' },
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
