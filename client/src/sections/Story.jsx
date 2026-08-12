import { Link } from 'react-router';
import { LuArrowRight } from 'react-icons/lu';
import { moss1 } from '../assets/images';
import PhotoBackdrop from '../components/PhotoBackdrop';

// The photograph was a rounded card beside the copy, which read as an
// illustration of the section. Full-bleed behind a scrim, it reads as the
// setting the copy is describing.
const Story = () => (
    <PhotoBackdrop image={moss1}>
        <div id="about" className="max-container padding-x py-28 scroll-mt-24">
            <div className="max-w-[46rem]">
                <p className="eyebrow">Our process</p>
                <h2 className="font-display text-(length:--text-display) leading-tight mt-4 text-balance">
                    Grown slowly, <em className="text-accent italic">made by hand</em>
                </h2>
                <p className="mt-6 text-text-muted leading-relaxed max-w-[65ch] text-pretty">
                    Every piece begins with moss gathered under licence from managed Nordic
                    woodland, taken in small quantities so the ground recovers before we return.
                </p>
                <p className="mt-4 text-text-muted leading-relaxed max-w-[65ch] text-pretty">
                    In the studio it is cleaned and preserved with a plant-based glycerin
                    solution. That halts ageing permanently, so the moss keeps its colour and
                    softness for years with no water and no light.
                </p>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 mt-8 text-accent
                               underline underline-offset-4
                               hover:[&>svg]:translate-x-1 [&>svg]:transition-transform [&>svg]:duration-200"
                >
                    See the collection <LuArrowRight size={16} />
                </Link>
            </div>
        </div>
    </PhotoBackdrop>
);

export default Story;
