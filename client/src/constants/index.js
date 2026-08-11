import { FaFacebookF, FaXTwitter, FaInstagram, FaTiktok } from 'react-icons/fa6';

// Every entry must resolve to something that exists. A "Journal" link used to
// sit here pointing at /#story, an anchor no section ever rendered.
export const navLinks = [
    { to: '/products', label: 'Shop' },
    { to: '/#about', label: 'About' },
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
            { name: 'FAQs', to: '/#faq' },
            { name: 'Delivery', to: '/#delivery' },
            { name: 'Returns', to: '/#returns' },
        ],
    },
    {
        title: 'Get in touch',
        links: [
            { name: 'customer@mossart.com', to: 'mailto:customer@mossart.com' },
            { name: '+44 7700 900142', to: 'tel:+447700900142' },
        ],
    },
];

export const socialMedia = [
    { Icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com' },
    { Icon: FaXTwitter, label: 'X', href: 'https://x.com' },
    { Icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' },
    { Icon: FaTiktok, label: 'TikTok', href: 'https://tiktok.com' },
];
