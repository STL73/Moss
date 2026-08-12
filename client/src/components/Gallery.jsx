import { useState } from 'react';

const Gallery = ({ images, alt }) => {
    const [index, setIndex] = useState(0);
    const [zoomed, setZoomed] = useState(false);
    const [origin, setOrigin] = useState('center');

    const handleMove = (event) => {
        if (!zoomed) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setOrigin(`${x}% ${y}%`);
    };

    return (
        <div>
            {/* A real button, not an onClick on the image: inspecting the piece
                is the whole point of this component, so it has to be reachable
                by keyboard and announced as a toggle. */}
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                <button
                    type="button"
                    aria-label={`Zoom ${alt}`}
                    aria-pressed={zoomed}
                    onClick={() => setZoomed((value) => !value)}
                    onMouseMove={handleMove}
                    onMouseLeave={() => setZoomed(false)}
                    className={`block w-full overflow-hidden
                                ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                >
                    <img
                        src={images[index]}
                        alt={alt}
                        style={{ transformOrigin: origin }}
                        className={`w-full aspect-square object-cover transition-transform duration-500
                                    ${zoomed ? 'scale-[1.8]' : 'scale-100'}`}
                    />
                </button>
            </div>

            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2.5 mt-3">
                    {images.map((image, imageIndex) => (
                        <button
                            key={image}
                            type="button"
                            aria-label={`View image ${imageIndex + 1}`}
                            aria-pressed={imageIndex === index}
                            onClick={() => { setIndex(imageIndex); setZoomed(false); }}
                            className={`rounded-lg overflow-hidden border-2 cursor-pointer
                                        transition-colors duration-200 ${
                                imageIndex === index ? 'border-accent' : 'border-transparent hover:border-border-interactive'
                            }`}
                        >
                            <img src={image} alt="" className="w-full aspect-square object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gallery;
