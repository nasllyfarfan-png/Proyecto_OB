// Igual que en la web (src/data/categories.js), estas son las categorías
// "conocidas" con su imagen y descripción. El backend de productos no tiene
// un endpoint propio de categorías, así que las categorías reales se derivan
// de los productos existentes (ver getCategoriesFromProducts en utils),
// pero usamos este diccionario para mostrarlas con la misma imagen/estilo
// que en la página web cuando el nombre coincide.

export interface CategoryMeta {
    id: string;
    name: string;
    img: string;
    desc: string;
}

export const DEFAULT_CATEGORY_META: Record<string, CategoryMeta> = {
    mujer: {
        id: 'mujer',
        name: 'Mujer',
        img: 'https://i.pinimg.com/564x/14/e3/48/14e348643988ab92efcef1ad29161922.jpg',
        desc: 'Diseños con actitud',
    },
    hombre: {
        id: 'hombre',
        name: 'Hombre',
        img: 'https://allinoutfits.com/wp-content/uploads/Mejores-outfits-hombre-formales-con-ropa-actual-en-tendencia.jpg',
        desc: 'Estilo urbano y moderno',
    },
    juvenil: {
        id: 'juvenil',
        name: 'Juvenil',
        img: 'https://i.pinimg.com/736x/79/fd/f5/79fdf5e7d433a20766a77554bb06a86a.jpg',
        desc: 'Tendencia joven',
    },
    'niños': {
        id: 'niños',
        name: 'Niños',
        img: 'https://i.pinimg.com/736x/96/d1/6f/96d16f67bdc54b4c90b4fd40359adae6.jpg',
        desc: 'Comodidad y color',
    },
};

const FALLBACK_IMG = 'https://i.pinimg.com/736x/8f/bc/68/8fbc68f73eba7ceaf2e8275542c3524f.jpg';

export function metaFor(categoryId: string): CategoryMeta {
    const key = (categoryId || '').trim().toLowerCase();
    if (DEFAULT_CATEGORY_META[key]) return DEFAULT_CATEGORY_META[key];
    return {
        id: categoryId,
        name: categoryId ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) : 'Otros',
        img: FALLBACK_IMG,
        desc: 'Explora esta categoría',
    };
}

// Igual que sizesFor() en la web: los niños usan tallas por edad,
// el resto usa tallas estándar S/M/L/XL.
export function sizesFor(categoryId: string): string[] {
    const key = (categoryId || '').trim().toLowerCase();
    if (key === 'niños' || key === 'ninos' || key === 'niño' || key === 'nino') {
        return ['2-3a', '4-5a', '6-7a', '8-9a', '10-11a'];
    }
    return ['S', 'M', 'L', 'XL'];
}

export function formatCOP(n: number): string {
    try {
        return '$' + new Intl.NumberFormat('es-CO').format(Number(n) || 0);
    } catch {
        return `$${Math.round(Number(n) || 0)}`;
    }
}
