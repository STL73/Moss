import { FaFacebookF, FaXTwitter, FaInstagram, FaTiktok, FaTruckFast } from "react-icons/fa6";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";
import { thumbnailProduct1, bigProduct1, thumbnailProduct2, bigProduct2, thumbnailProduct3, bigProduct3, product1, product2, product3, product4, mossHero, moss2, moss3, customer1, customer2 } from "../assets/images";
export const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about-us", label: "About Us" },
    { href: "#products", label: "Products" },
    { href: "#contact-us", label: "Contact Us" },
];

export const statistics = [
    { value: '10+', label: 'Moss Brands' },
    { value: '200+', label: 'Products' },
    { value: '3k+', label: 'Customers' },
];

export const thumbnails = [
    {
        thumbnail: thumbnailProduct1,
        bigProduct: bigProduct1,
    },
    {
        thumbnail: thumbnailProduct2,
        bigProduct: bigProduct2,
    },
    {
        thumbnail: thumbnailProduct3,
        bigProduct: bigProduct3,
    },
];

export const products = [
    {
        imgURL: product1,
        name: "Moss and Flowers Decoration in Open Pot",
        price: "£28.99",
    },
    {
        imgURL: product2,
        name: "Moss Decoration in Glass Bowl",
        price: "£25.99",
    },
    {
        imgURL: product3,
        name: "Moss and Bird Decoration",
        price: "£13.99",
    },
    {
        imgURL: product4,
        name: "Moss and Stones Decoration in Plater",
        price: "£16.99",
    },
];

export const services = [
    {
        imgURL: FaTruckFast,
        label: "Free shipping",
        subtext: "Enjoy seamless shopping with our complimentary shipping service."
    },
    {
        imgURL: IoShieldCheckmark,
        label: "Secure Payment",
        subtext: "Experience worry-free transactions with our secure payment options."
    },
    {
        imgURL: MdOutlineContactSupport,
        label: "Love to help you",
        subtext: "Our dedicated team is here to assist you every step of the way."
    },
];

export const offer = [
    { 
        src: mossHero, 
        alt: "moss beauty" 
    },
    {
        src: moss2,
        alt: "moss beauty"
    },
    {
        src: moss3,
        alt: "moss beauty"
    }
]

export const reviews = [
    {
        imgURL: customer1,
        customerName: 'Slav Lambov',
        rating: 4.5,
        feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
    },
    {
        imgURL: customer2,
        customerName: 'Rositsa Milusheva',
        rating: 4.5,
        feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
    }
];

export const footerLinks = [
    {
        title: "Products",
        links: [
            { name: "Moss and Flowers Decoration in Open Pot", link: "/" },
            { name: "Moss Decoration in Glass Bowl", link: "/" },
            { name: "Moss and Bird Decoration", link: "/" },
            { name: "Moss and Stones Decoration in Plater", link: "/" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Payment policy", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "customer@mossart.com", link: "mailto:customer@mossart.com" },
            { name: "+447700900142", link: "tel:+447700900142" },
        ],
    },
];

export const socialMedia = [
    { src: FaFacebookF, alt: "facebook logo" },
    { src: FaXTwitter, alt: "twitter logo" },
    { src: FaInstagram, alt: "instagram logo" },
    {src: FaTiktok, alt: "tiktok logo" },
];
