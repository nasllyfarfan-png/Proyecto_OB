import { useCallback, useEffect, useState } from 'react';
import { Product } from '../../Domain/entities/Product';
import { GetProductsUseCase } from '../../Domain/UseCases/products/GetProducts';
import { metaFor, CategoryMeta } from '../../Data/local/categoryMeta';
import { DEMO_PRODUCTS } from '../../Data/local/demoProducts';
import { getCustomCategories } from '../../Data/local/customCategories';

export const useCatalog = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [customCategories, setCustomCategories] = useState<CategoryMeta[]>([]);
    const [usingDemo, setUsingDemo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const response = await GetProductsUseCase();
            const backendProducts: Product[] = response?.success
                ? (response.data ?? []).filter((p: Product) => p.isActive !== false)
                : [];

            if (backendProducts.length > 0) {
                setProducts(backendProducts);
                setUsingDemo(false);
                setErrorMessage('');
            } else {
                // Tu backend todavía no tiene productos cargados (o no respondió):
                // mostramos el catálogo de muestra para que la tienda no se vea vacía.
                setProducts(DEMO_PRODUCTS);
                setUsingDemo(true);
                setErrorMessage(response?.success ? '' : (response?.message || ''));
            }
        } catch (e) {
            setProducts(DEMO_PRODUCTS);
            setUsingDemo(true);
        }
        setCustomCategories(await getCustomCategories());
        setLoading(false);
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const derivedIds = Array.from(
        new Set(products.map((p) => (p.category || '').trim().toLowerCase()).filter(Boolean))
    );
    const derivedCategories: CategoryMeta[] = derivedIds.map(metaFor);
    const customIds = customCategories.map((c) => c.id);

    // Categorías reales (derivadas de productos) + personalizadas creadas por el admin,
    // sin duplicar si ya coinciden por id.
    const categories: CategoryMeta[] = [
        ...derivedCategories,
        ...customCategories.filter((c) => !derivedIds.includes(c.id)),
    ];

    const isCustomCategory = (id: string) => customIds.includes(id);

    return {
        products,
        categories,
        customCategories,
        isCustomCategory,
        loading,
        errorMessage,
        usingDemo,
        reload: load,
    };
};
