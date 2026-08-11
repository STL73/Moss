// Mirrors the server's Product schema so lib/api.js can swap to real fetch
// calls without any component changing. Prices are integers in pence.
// slug and species do not yet exist server-side — see the spec's backend
// dependencies section.
import { product1, product2, product3, product4, moss1, moss3, moss5, moss7 } from '../assets/images';

export const categories = [
    { slug: 'all', name: 'All' },
    { slug: 'moss-pots', name: 'Moss Pots' },
    { slug: 'wall-art', name: 'Wall Art' },
    { slug: 'wreaths', name: 'Wreaths' },
    { slug: 'planters', name: 'Planters' },
    { slug: 'tabletop', name: 'Tabletop' },
];

export const products = [
    {
        id: '1', slug: 'kivi-sphere', name: 'Kivi Sphere', species: 'Cladonia stellaris',
        description: 'Reindeer moss in a hand-blown glass sphere, cut open at an angle so the texture catches the light.',
        price: 8500, images: [product1, moss1], category: 'moss-pots', stock: 6, isAvailable: true,
    },
    {
        id: '2', slug: 'metsa-panel', name: 'Metsä Panel', species: 'Mixed forest moss',
        description: 'A framed wall panel of mixed forest mosses, layered for depth and mounted on reclaimed birch.',
        price: 24000, images: [product2, moss3], category: 'wall-art', stock: 2, isAvailable: true,
    },
    {
        id: '3', slug: 'rauha-concrete', name: 'Rauha Concrete', species: 'Leucobryum glaucum',
        description: 'Cushion moss set in a hand-poured concrete bowl. Weighty, quiet, and entirely maintenance-free.',
        price: 4500, images: [product3, moss5], category: 'planters', stock: 11, isAvailable: true,
    },
    {
        id: '4', slug: 'lampi-jar', name: 'Lampi Jar', species: 'Grimmia pulvinata',
        description: 'Preserved cushion moss in a wide apothecary jar, finished with river stones and a single piece of driftwood.',
        price: 6000, images: [product4, moss7], category: 'tabletop', stock: 8, isAvailable: true,
    },
    {
        id: '5', slug: 'aurora-bowl', name: 'Aurora Bowl', species: 'Cladonia rangiferina',
        description: 'Pale reindeer moss in a shallow ceramic bowl, glazed in a matte bone white.',
        price: 5500, images: [moss1, product1], category: 'moss-pots', stock: 4, isAvailable: true,
    },
    {
        id: '6', slug: 'talvi-frame', name: 'Talvi Frame', species: 'Thuidium tamariscinum',
        description: 'Fern moss pressed into a slim oak frame. Reads almost as a drawing from across a room.',
        price: 11000, images: [moss3, product2], category: 'wall-art', stock: 3, isAvailable: true,
    },
    {
        id: '7', slug: 'joki-stones', name: 'Joki Stones', species: 'Grimmia pulvinata',
        description: 'Moss cushions arranged between smooth river stones on a slate base.',
        price: 3500, images: [moss5, product3], category: 'tabletop', stock: 14, isAvailable: true,
    },
    {
        id: '8', slug: 'havu-wreath', name: 'Havu Wreath', species: 'Mixed lichen',
        description: 'A dense ring of preserved moss and lichen on a willow base. Lasts years indoors.',
        price: 7500, images: [moss7, product4], category: 'wreaths', stock: 5, isAvailable: true,
    },
];
