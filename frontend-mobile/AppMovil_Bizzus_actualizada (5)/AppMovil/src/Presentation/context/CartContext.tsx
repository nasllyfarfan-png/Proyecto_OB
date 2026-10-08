import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    img?: string;
    category: string;
    size?: string;
    qty: number;
}

interface CartContextValue {
    cart: CartItem[];
    cartCount: number;
    total: number;
    addToCart: (item: Omit<CartItem, 'qty'>) => void;
    updateQty: (id: string, size: string | undefined, delta: number) => void;
    removeFromCart: (id: string, size?: string) => void;
    clearCart: () => void;
}

const STORAGE_KEY = 'bizzus_cart';

const CartContext = createContext<CartContextValue | undefined>(undefined);

const keyOf = (id: string, size?: string) => `${id}__${size ?? ''}`;

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const raw = await AsyncStorage.getItem(STORAGE_KEY);
                if (raw) setCart(JSON.parse(raw));
            } catch (e) {
                console.log('Error cargando carrito:', e);
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    useEffect(() => {
        if (!loaded) return;
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cart)).catch((e) =>
            console.log('Error guardando carrito:', e)
        );
    }, [cart, loaded]);

    const addToCart = (item: Omit<CartItem, 'qty'>) => {
        setCart((prev) => {
            const k = keyOf(item.id, item.size);
            const existing = prev.find((it) => keyOf(it.id, it.size) === k);
            if (existing) {
                return prev.map((it) =>
                    keyOf(it.id, it.size) === k ? { ...it, qty: it.qty + 1 } : it
                );
            }
            return [...prev, { ...item, qty: 1 }];
        });
    };

    const updateQty = (id: string, size: string | undefined, delta: number) => {
        setCart((prev) =>
            prev
                .map((it) =>
                    keyOf(it.id, it.size) === keyOf(id, size)
                        ? { ...it, qty: Math.max(1, it.qty + delta) }
                        : it
                )
        );
    };

    const removeFromCart = (id: string, size?: string) => {
        setCart((prev) => prev.filter((it) => keyOf(it.id, it.size) !== keyOf(id, size)));
    };

    const clearCart = () => setCart([]);

    const cartCount = useMemo(() => cart.reduce((s, it) => s + it.qty, 0), [cart]);
    const total = useMemo(() => cart.reduce((s, it) => s + it.price * it.qty, 0), [cart]);

    return (
        <CartContext.Provider
            value={{ cart, cartCount, total, addToCart, updateQty, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
    return ctx;
};
