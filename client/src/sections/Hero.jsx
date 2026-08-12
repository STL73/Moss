import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import Button from '../components/Button';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { PLACEHOLDER_STATS } from '../constants';
import heroImage from '../assets/brand/hero.webp';

const Hero = () => {
    const ref = useRef(null);
    const reduced = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    // The image moves slower than the page, which reads as depth.
    const scrollY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
    // Hooks must run unconditionally, so the preference is applied to the
    // result rather than by skipping useTransform.
    const imageY = reduced ? '0%' : scrollY;

    return (
        <>
            <section ref={ref} id="home" className="relative flex xl:flex-row flex-col min-h-[88vh] max-container">
                <div className="xl:w-[45%] w-full flex flex-col justify-center padding-x py-20 z-10">
                    <p className="eyebrow">Handmade in small batches</p>
                    <h1 className="font-display text-(length:--text-hero) leading-[0.98] mt-6">
                        Living <em className="text-accent italic">texture</em>
                    </h1>
                    <p className="mt-7 max-w-sm text-text-muted leading-relaxed">
                        Preserved Nordic moss, arranged by hand. It keeps its colour and
                        softness for years without water, light or any attention at all.
                    </p>
                    <div className="mt-10">
                        <Button as={Link} to="/products">Shop the collection</Button>
                    </div>
                </div>

                <div className="flex-1 relative overflow-hidden xl:min-h-[88vh] min-h-[52vh]">
                    {/* Parallax on the wrapper, Ken Burns on the image — the two
                        transforms would fight for the same property otherwise. */}
                    <motion.div style={{ y: imageY }} className="absolute inset-0">
                        <img
                            src={heroImage}
                            alt="Close-up of preserved moss with a water droplet"
                            fetchPriority="high"
                            className="size-full object-cover animate-ken-burns"
                        />
                    </motion.div>
                </div>
            </section>

            <section className="max-container padding-x py-14 border-y border-border">
                {/* Development only — Vite strips this from production builds.
                    It exists so these figures cannot be demoed or shipped
                    without someone noticing they were never verified. */}
                {import.meta.env.DEV && (
                    <p
                        data-testid="placeholder-warning"
                        className="mb-8 inline-block rounded-full border border-dashed border-accent
                                   px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent"
                    >
                        Sample data — not real figures
                    </p>
                )}
                <div className="flex justify-between flex-wrap gap-10">
                    {PLACEHOLDER_STATS.map((stat) => (
                        <div key={stat.label}>
                            <p className="font-display text-(length:--text-title)">
                                {stat.value} <em className="text-accent italic">{stat.label}</em>
                            </p>
                            <p className="eyebrow mt-2">{stat.suffix}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Hero;
