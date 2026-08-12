import { Outlet } from 'react-router';
import { MotionConfig } from 'motion/react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import Toast from '../components/Toast';
import ScrollToHash from '../components/ScrollToHash';

// Motion drives its animations through the Web Animations API, which the
// prefers-reduced-motion block in index.css cannot reach — that block only
// neutralises CSS animations and transitions. "user" makes every Motion
// animation below defer to the OS setting instead.
const RootLayout = () => (
    <MotionConfig reducedMotion="user">
        <div className="min-h-screen flex flex-col bg-bg text-text">
            <ScrollToHash />
            <Nav />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <CartDrawer />
            <Toast />
        </div>
    </MotionConfig>
);

export default RootLayout;
