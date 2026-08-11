import { Outlet } from 'react-router';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const RootLayout = () => (
    <div className="min-h-screen flex flex-col bg-bg text-text">
        <Nav />
        <main className="flex-1">
            <Outlet />
        </main>
        <Footer />
    </div>
);

export default RootLayout;
