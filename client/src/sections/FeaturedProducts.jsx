import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { LuArrowRight } from 'react-icons/lu';
import { getProducts } from '../lib/api';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import Reveal from '../components/Reveal';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    useEffect(() => {
        let active = true;
        getProducts().then((result) => {
            if (!active) return;
            setProducts(result.slice(0, 4));
            setLoading(false);
        });
        return () => { active = false; };
    }, []);

    return (
        <section id="featured" className="max-container padding-x py-24">
            {/* The Reveal is inside the section rather than around it, so the
                section keeps its id as a scroll target and its own padding.
                Wrapping the outside would move the anchor onto a div and put a
                transform on the element ScrollToHash scrolls to. */}
            <Reveal>
                <div className="flex justify-between items-end gap-6">
                    <h2 className="font-display text-(length:--text-display) leading-tight">
                        Selected <em className="text-accent italic">pieces</em>
                    </h2>
                    <Link
                        to="/products"
                        viewTransition
                        className="flex items-center gap-2 text-sm text-text-muted hover:text-text
                                   underline underline-offset-4 transition-colors duration-200 shrink-0"
                    >
                        View all <LuArrowRight size={15} />
                    </Link>
                </div>

                <div className="mt-12 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                    {loading
                        ? Array.from({ length: 4 }, (_, index) => <ProductCardSkeleton key={index} />)
                        : products.map((product) => (
                            <ProductCard key={product.id} product={product} onAdd={addItem} />
                        ))}
                </div>
            </Reveal>
        </section>
    );
};

export default FeaturedProducts;
