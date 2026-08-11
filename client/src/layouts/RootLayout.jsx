import { Outlet } from 'react-router';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import Toast from '../components/Toast';
import ScrollToHash from '../components/ScrollToHash';

const RootLayout = () => (
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
);

export default RootLayout;
