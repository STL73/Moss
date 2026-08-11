import { createBrowserRouter } from 'react-router';
import RootLayout from './layouts/RootLayout';
import Home from './routes/Home';
import Products from './routes/Products';
import ProductDetail from './routes/ProductDetail';
import Cart from './routes/Cart';
import NotFound from './routes/NotFound';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'products', element: <Products /> },
            { path: 'products/:slug', element: <ProductDetail /> },
            { path: 'cart', element: <Cart /> },
            { path: '*', element: <NotFound /> },
        ],
    },
]);
