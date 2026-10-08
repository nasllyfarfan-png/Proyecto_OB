import AsyncStorage from '@react-native-async-storage/async-storage';
import { CategoryMeta } from './categoryMeta';

// Igual que en la web (src/data/categories.js): el backend todavía no tiene
// un endpoint de categorías, así que el admin puede crear/eliminar
// categorías personalizadas desde el panel de Inventario, guardadas en el
// dispositivo (AsyncStorage), no en la base de datos.
const STORAGE_KEY = 'bizzus_custom_categories';

const FALLBACK_IMG = 'https://i.pinimg.com/736x/8f/bc/68/8fbc68f73eba7ceaf2e8275542c3524f.jpg';

function slugify(name: string): string {
    return name
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, (m) => (m === '\u0303' ? m : ''))
        .normalize('NFC')
        .replace(/\s+/g, '-');
}

export async function getCustomCategories(): Promise<CategoryMeta[]> {
    try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

async function saveCustomCategories(list: CategoryMeta[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export async function addCustomCategory(
    name: string,
    img: string,
    existingIds: string[]
): Promise<CategoryMeta[]> {
    const clean = (name || '').trim();
    if (!clean) throw new Error('El nombre de la categoría es obligatorio');

    const id = slugify(clean);
    if (existingIds.includes(id)) {
        throw new Error('Ya existe una categoría con ese nombre');
    }

    const custom = await getCustomCategories();
    const updated = [
        ...custom,
        { id, name: clean, img: img.trim() || FALLBACK_IMG, desc: 'Categoría personalizada' },
    ];
    await saveCustomCategories(updated);
    return updated;
}

export async function deleteCustomCategory(id: string): Promise<CategoryMeta[]> {
    const custom = await getCustomCategories();
    const updated = custom.filter((c) => c.id !== id);
    await saveCustomCategories(updated);
    return updated;
}
