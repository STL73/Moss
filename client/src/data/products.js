// Mirrors the server's Product schema so lib/api.js can swap to real fetch
// calls without any component changing. Prices are integers in pence.
// slug and species do not yet exist server-side — see the spec's backend
// dependencies section.
//
// Six products, not eight, as of 2026-08-16. Four of the original eight were
// illustrated with landscape photography — creek water over rocks, hillside
// texture, forest floor — which is scenery, not something a customer can buy,
// and it made the grid read as a nature blog rather than a shop. Rather than
// keep selling a hillside, the catalogue was cut to the photographs that
// actually show a finished piece.
//
// Two went with them: Joki Stones and Havu Wreath, neither of which had a
// plausible photograph. The wreaths category went too — it had exactly one
// product and no image that resembled a wreath. Both come back when there is
// photography to justify them, and the shape of this file is what a real
// catalogue would look like at six items, so nothing structural has to change.
//
// Every product carries one image. The gallery hides its thumbnail strip below
// two, so a single honest photograph looks deliberate where a repeated one
// would look like a mistake.
import {
    apothecaryJar,
    glassSphere,
    concreteBowl,
    fernFrame,
    paleBowl,
    logArrangement,
} from '../assets/images';

export const categories = [
    { slug: 'all', name: 'All' },
    { slug: 'moss-pots', name: 'Moss Pots' },
    { slug: 'wall-art', name: 'Wall Art' },
    { slug: 'planters', name: 'Planters' },
    { slug: 'tabletop', name: 'Tabletop' },
];

export const products = [
    {
        id: '1', slug: 'kivi-sphere', name: 'Kivi Sphere', species: 'Cladonia stellaris',
        description: 'Reindeer moss in a hand-blown glass sphere, cut open at an angle so the texture catches the light.',
        price: 8500, images: [glassSphere], category: 'moss-pots', stock: 6, isAvailable: true,
    },
    {
        id: '2', slug: 'metsa-panel', name: 'Metsä Panel', species: 'Mixed forest moss',
        description: 'A framed wall panel of mixed forest mosses, layered for depth and mounted on reclaimed birch.',
        price: 24000, images: [logArrangement], category: 'wall-art', stock: 2, isAvailable: true,
    },
    {
        id: '3', slug: 'rauha-concrete', name: 'Rauha Concrete', species: 'Leucobryum glaucum',
        description: 'Cushion moss set in a hand-poured concrete bowl. Weighty, quiet, and entirely maintenance-free.',
        price: 4500, images: [concreteBowl], category: 'planters', stock: 11, isAvailable: true,
    },
    {
        id: '4', slug: 'lampi-jar', name: 'Lampi Jar', species: 'Grimmia pulvinata',
        description: 'Preserved cushion moss in a wide apothecary jar, finished with river stones and a single piece of driftwood.',
        price: 6000, images: [apothecaryJar], category: 'tabletop', stock: 8, isAvailable: true,
    },
    {
        id: '5', slug: 'aurora-bowl', name: 'Aurora Bowl', species: 'Cladonia rangiferina',
        description: 'Pale reindeer moss in a shallow ceramic bowl, glazed in a matte bone white.',
        price: 5500, images: [paleBowl], category: 'moss-pots', stock: 4, isAvailable: true,
    },
    {
        id: '6', slug: 'talvi-frame', name: 'Talvi Frame', species: 'Thuidium tamariscinum',
        description: 'Fern moss pressed into a slim oak frame. Reads almost as a drawing from across a room.',
        price: 11000, images: [fernFrame], category: 'wall-art', stock: 3, isAvailable: true,
    },
];
