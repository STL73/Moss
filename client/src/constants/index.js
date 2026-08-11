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
