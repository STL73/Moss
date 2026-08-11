import { Link } from 'react-router';
import { LuArrowRight } from 'react-icons/lu';
import { moss1 } from '../assets/images';

const Story = () => (
    <section id="about" className="max-container padding-x py-24">
        <div className="flex items-center gap-16 max-lg:flex-col">
            <div className="flex-1 w-full">
                <img
                    src={moss1}
                    alt="Moss growing across a woodland floor"
                    loading="lazy"
                    className="w-full aspect-4/3 object-cover rounded-2xl"
                />
            </div>
            <div className="flex-1">
                <p className="eyebrow">Our process</p>
                <h2 className="font-display text-(length:--text-display) leading-tight mt-4">
                    Grown slowly, <em className="text-accent italic">made by hand</em>
                </h2>
                <p className="mt-6 text-text-muted leading-relaxed">
                    Every piece begins with moss gathered under licence from managed Nordic
                    woodland, taken in small quantities so the ground recovers before we return.
                </p>
                <p className="mt-4 text-text-muted leading-relaxed">
                    In the studio it is cleaned and preserved with a plant-based glycerin
                    solution. That halts ageing permanently, so the moss keeps its colour and
                    softness for years with no water and no light.
                </p>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 mt-8 text-accent
                               underline underline-offset-4 hover:gap-3 transition-all duration-200"
                >
                    See the collection <LuArrowRight size={16} />
                </Link>
            </div>
        </div>
    </section>
);

export default Story;
