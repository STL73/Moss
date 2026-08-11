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
            <div
                className="overflow-hidden rounded-2xl border border-border bg-surface"
                onMouseMove={handleMove}
                onMouseLeave={() => setZoomed(false)}
            >
                <img
                    src={images[index]}
                    alt={alt}
                    onClick={() => setZoomed((value) => !value)}
                    style={{ transformOrigin: origin }}
                    className={`w-full aspect-square object-cover transition-transform duration-500
                                ${zoomed ? 'scale-[1.8] cursor-zoom-out' : 'scale-100 cursor-zoom-in'}`}
                />
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
                                imageIndex === index ? 'border-accent' : 'border-transparent hover:border-border'
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
