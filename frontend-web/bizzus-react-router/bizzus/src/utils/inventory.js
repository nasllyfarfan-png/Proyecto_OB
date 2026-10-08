import { PRODS } from '../data/products';

const STORAGE_KEY = 'bizzus_inventory_products';
const LEGACY_KEY = 'products'; // formato antiguo usado por la versión previa del catálogo

function migrateLegacyIfNeeded() {
  const already = localStorage.getItem(STORAGE_KEY);
  if (already !== null) return;

  const legacyRaw = localStorage.getItem(LEGACY_KEY);
  if (!legacyRaw) {
    localStorage.setItem(STORAGE_KEY, '[]');
    return;
  }

  try {
    const legacy = JSON.parse(legacyRaw);
    const migrated = legacy.map((p, i) => ({
      id: Date.now() + i,
      name: p.name || 'Prenda sin nombre',
      cat: p.category || 'mujer',
      price: formatCOP(Number(String(p.price).replace(/\D/g, '')) || 0),
      img: p.image || '',
      tag: p.tag ? p.tag.toLowerCase() : '',
      s: 5,
      stock: 10,
      color: '',
      material: '',
      description: '',
      custom: true,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
  } catch {
    localStorage.setItem(STORAGE_KEY, '[]');
  }
}

export function formatCOP(n) {
  return '$' + new Intl.NumberFormat('es-CO').format(Number(n) || 0);
}

export function parseCOP(price) {
  return Number(String(price).replace(/\D/g, '')) || 0;
}

export function loadCustomProducts() {
  migrateLegacyIfNeeded();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveCustomProducts(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// Catálogo completo = productos base del código + productos agregados desde el panel de inventario.
export function getAllProducts() {
  return [...PRODS, ...loadCustomProducts()];
}

export function addProduct(data) {
  const list = loadCustomProducts();
  const newProduct = { ...data, id: Date.now(), custom: true };
  const updated = [...list, newProduct];
  saveCustomProducts(updated);
  return updated;
}

export function updateProduct(id, data) {
  const list = loadCustomProducts();
  const updated = list.map((p) => (p.id === id ? { ...p, ...data } : p));
  saveCustomProducts(updated);
  return updated;
}

export function deleteProduct(id) {
  const list = loadCustomProducts();
  const updated = list.filter((p) => p.id !== id);
  saveCustomProducts(updated);
  return updated;
}
