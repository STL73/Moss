import { useEffect } from 'react';
import { useLocation } from 'react-router';

// React Router does not scroll on navigation. Without this, a /#about link
// clicked from another route changes the URL and leaves you at the top of the
// page, and every route change inherits the previous page's scroll position.
const ScrollToHash = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo({ top: 0 });
            return;
        }
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }, [pathname, hash]);

    return null;
};

export default ScrollToHash;
