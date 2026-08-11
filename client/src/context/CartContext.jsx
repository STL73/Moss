import { useReducer, useEffect, useMemo, useState, useRef } from 'react';
import { CartContext } from '../hooks/useCart';

const STORAGE_KEY = 'cart';

// Every branch returns a new array — the cart is never mutated in place.
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existing = state.find((item) => item.id === action.product.id);
            if (existing) {
                return state.map((item) =>
                    item.id === action.product.id
                        ? { ...item, quantity: item.quantity + action.quantity }
                        : item
                );
            }
            return [...state, { ...action.product, quantity: action.quantity }];
        }
        case 'REMOVE_ITEM':
            return state.filter((item) => item.id !== action.id);
        case 'SET_QUANTITY':
            if (action.quantity <= 0) return state.filter((item) => item.id !== action.id);
            return state.map((item) =>
                item.id === action.id ? { ...item, quantity: action.quantity } : item
            );
        case 'CLEAR':
            return [];
        default:
            return state;
    }
};

const readStoredCart = () => {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return stored === null ? [] : JSON.parse(stored);
    } catch {
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [items, dispatch] = useReducer(cartReducer, undefined, readStoredCart);

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            // Private browsing — the cart still works for this session.
        }
    }, [items]);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [toast, setToast] = useState(null);
    const toastTimer = useRef(null);

    const showToast = (message) => {
        clearTimeout(toastTimer.current);
        setToast(message);
        toastTimer.current = setTimeout(() => setToast(null), 2600);
    };

    // A pending timer must not fire after the provider unmounts.
    useEffect(() => () => clearTimeout(toastTimer.current), []);

    const value = useMemo(() => ({
        items,
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
        total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        drawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        toast,
        // Adding always reveals the basket, so the result of the action is
        // visible without the user going looking for it.
        addItem: (product, quantity = 1) => {
            dispatch({ type: 'ADD_ITEM', product, quantity });
            setDrawerOpen(true);
            showToast(`${product.name} added to basket`);
        },
        removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', id }),
        setQuantity: (id, quantity) => dispatch({ type: 'SET_QUANTITY', id, quantity }),
        clear: () => dispatch({ type: 'CLEAR' }),
    }), [items, drawerOpen, toast]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
