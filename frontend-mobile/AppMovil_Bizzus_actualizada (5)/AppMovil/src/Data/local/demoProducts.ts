import { Product } from '../../Domain/entities/Product';

// Mismos productos que en la web (src/data/products.js), adaptados a la
// forma del Product del backend. Se usan como catálogo de respaldo cuando
// tu API todavía no tiene productos cargados, para que la tienda no se
// vea vacía. En cuanto agregues productos reales desde el panel de
// Inventario (conectado a tu backend), esos reemplazan a estos.
const RAW: { id: number; name: string; cat: string; price: number; tag?: string; img: string; s: number }[] = [
    { id: 1, name: 'Blusa Floral Suave', cat: 'mujer', price: 92000, tag: 'new', img: 'https://i.pinimg.com/736x/0d/e8/1d/0de81d3bdffc75b87ee9022c30761e2c.jpg', s: 5 },
    { id: 2, name: 'Jean Wide Leg', cat: 'mujer', price: 99000, img: 'https://i.pinimg.com/736x/05/0f/79/050f7960ad8d536829d68a9e202d7622.jpg', s: 5 },
    { id: 3, name: 'Chaqueta Oversize', cat: 'mujer', price: 100000, img: 'https://romabrand.co/cdn/shop/files/52_be8ebcb0-6ff1-47f2-8f09-d36b3c1f8e52.jpg?v=1764088519&width=1000', s: 5 },
    { id: 4, name: 'Estilo Vaquero Moderno', cat: 'mujer', price: 115000, tag: 'hot', img: 'https://i.pinimg.com/736x/2d/e9/74/2de9745aaba1daf84606872941ea97fb.jpg', s: 5 },
    { id: 5, name: 'Set Esencial Blanco', cat: 'mujer', price: 85000, tag: 'new', img: 'https://i.pinimg.com/1200x/26/fe/0a/26fe0a574ba644fc0584a6158a0cdbbb.jpg', s: 5 },
    { id: 6, name: 'Corset Moka Glam', cat: 'mujer', price: 99000, img: 'https://i.pinimg.com/736x/8b/a2/55/8ba255580270e6a28b2adcaa3c5e9dcf.jpg', s: 5 },
    { id: 7, name: 'Elegancia Caramelo', cat: 'mujer', price: 110000, img: 'https://i.pinimg.com/736x/a6/dc/a8/a6dca841be71d44fe10a4aa2b73397ce.jpg', s: 5 },
    { id: 8, name: 'Vestido Elegante', cat: 'mujer', price: 130000, tag: 'hot', img: 'https://img.kwcdn.com/product/fancy/55581f8d-c89b-49e2-a5e4-6c1876e8b868.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp', s: 5 },
    { id: 9, name: 'Camiseta Esencial', cat: 'hombre', price: 95000, img: 'https://uwu.com.co/wp-content/uploads/2023/04/essentials-beige.jpg', s: 4 },
    { id: 10, name: 'Chaqueta Beisbolera', cat: 'hombre', price: 110000, tag: 'new', img: 'https://i.pinimg.com/736x/ea/8d/ce/ea8dcec0c3fe1e54380a295bf32328f3.jpg', s: 4 },
    { id: 11, name: 'Bermuda Azul Hielo', cat: 'hombre', price: 100000, img: 'https://i.pinimg.com/736x/a2/78/bf/a278bf7652e4f25bff31cccc3266be3c.jpg', s: 4 },
    { id: 12, name: 'Sudadera De Otoño', cat: 'hombre', price: 120000, tag: 'hot', img: 'https://i.pinimg.com/1200x/c7/4f/7b/c74f7b6906638f53c3ad17c4f3b5904e.jpg', s: 4 },
    { id: 13, name: 'Jean Slim Fit', cat: 'hombre', price: 115000, img: 'https://i.pinimg.com/736x/5c/62/11/5c6211e643cbe6ad5c85bd11c60ee63f.jpg', s: 5 },
    { id: 14, name: 'Desierto Urbano', cat: 'hombre', price: 90000, tag: 'hot', img: 'https://i.pinimg.com/736x/8f/bc/68/8fbc68f73eba7ceaf2e8275542c3524f.jpg', s: 4 },
    { id: 15, name: 'Ropa urbana', cat: 'hombre', price: 85000, img: 'https://i.pinimg.com/1200x/f8/3d/52/f83d52708e34658451c3e52bef539c10.jpg', s: 4 },
    { id: 16, name: 'Estilo deportivo', cat: 'hombre', price: 100000, tag: 'new', img: 'https://i.pinimg.com/1200x/e4/e9/7f/e4e97f5b65d5eb5f32e704313575c772.jpg', s: 4 },
    { id: 17, name: 'Elegancia Lavanda', cat: 'juvenil', price: 105000, tag: 'new', img: 'https://i.pinimg.com/736x/03/03/37/030337788a5eac2eecf2de0d425300a8.jpg', s: 5 },
    { id: 18, name: 'Chaqueta Polar Urbana', cat: 'juvenil', price: 130000, tag: 'new', img: 'https://i.pinimg.com/736x/a2/8a/c0/a28ac0a4e0939d1e9fdabcc4b56ad2b9.jpg', s: 4 },
    { id: 19, name: 'Short Mezclilla Claro', cat: 'juvenil', price: 80000, img: 'https://i.pinimg.com/736x/bf/ae/c2/bfaec25be7ad6d7b5e2acbd3d68c2c7f.jpg', s: 5 },
    { id: 20, name: 'Suéter Tejido Oversize', cat: 'juvenil', price: 80000, img: 'https://i.pinimg.com/1200x/35/dc/8d/35dc8daea8ea7bc78ef0306d62341d30.jpg', s: 4 },
    { id: 21, name: 'Jersey con Decoración de Lazo', cat: 'juvenil', price: 120000, img: 'https://i.pinimg.com/736x/fc/4f/bb/fc4fbbd9e37687a641f4b71a5e8dabcd.jpg', s: 4 },
    { id: 22, name: 'Conjunto Rosado Estampado', cat: 'juvenil', price: 95000, img: 'https://i.pinimg.com/736x/4b/09/fa/4b09fa994f9248e5f9a811ba1b1c4665.jpg', s: 4 },
    { id: 23, name: 'Overol Jean Ancho', cat: 'juvenil', price: 100000, tag: 'hot', img: 'https://i.pinimg.com/736x/1e/70/e2/1e70e2ce0821c32030ae3175d1635192.jpg', s: 4 },
    { id: 24, name: 'Set Deportivo', cat: 'juvenil', price: 90000, tag: 'hot', img: 'https://i.pinimg.com/736x/48/9a/94/489a94c178e47318c1744ee8250a035f.jpg', s: 4 },
    { id: 25, name: 'Conjunto Elegante Gris', cat: 'niños', price: 85000, tag: 'new', img: 'https://i.pinimg.com/1200x/0c/c3/63/0cc363777dfab28efa9a445e2467133f.jpg', s: 5 },
    { id: 26, name: 'Set Casual Azul', cat: 'niños', price: 75000, tag: 'hot', img: 'https://i.pinimg.com/736x/0a/a9/6e/0aa96ef1be6d6dbce6442f36d0b4a321.jpg', s: 5 },
    { id: 27, name: 'Set Fashion Negro', cat: 'niños', price: 85000, img: 'https://i.pinimg.com/1200x/cb/e5/b8/cbe5b8b0c49e2ef8711dbf7769c0d676.jpg', s: 5 },
    { id: 28, name: 'Set Deportivo Beige', cat: 'niños', price: 80000, tag: 'new', img: 'https://i.pinimg.com/1200x/c1/03/9b/c1039b840fbd58e99efe21730d60436e.jpg', s: 5 },
    { id: 29, name: 'Outfit Verano Casual', cat: 'niños', price: 90000, tag: 'hot', img: 'https://i.pinimg.com/736x/5e/a4/02/5ea4025423ce0f17c1eb11b4ab073c08.jpg', s: 5 },
    { id: 30, name: 'Set Urban', cat: 'niños', price: 93000, img: 'https://i.pinimg.com/736x/1d/f7/a9/1df7a915021168bd59b7190340fb4d88.jpg', s: 5 },
    { id: 31, name: 'Conjunto Denim Oscuro', cat: 'niños', price: 73000, tag: 'new', img: 'https://i.pinimg.com/736x/4a/c4/ef/4ac4ef4b45d7d7b0d60b653e36e02796.jpg', s: 5 },
    { id: 32, name: 'Conjunto Denim Claro', cat: 'niños', price: 95000, tag: 'new', img: 'https://i.pinimg.com/736x/1f/42/d4/1f42d45b6d8ef19defbfc6bb71f32d1d.jpg', s: 5 },
];

export const DEMO_PRODUCTS: Product[] = RAW.map((p) => ({
    id: `demo-${p.id}`,
    name: p.name,
    description: '',
    price: p.price,
    category: p.cat,
    image: p.img,
    stock: 10,
    isActive: true,
    discount: p.tag === 'hot' ? 15 : undefined,
}));

export function findDemoProduct(id: string): Product | undefined {
    return DEMO_PRODUCTS.find((p) => p.id === id);
}
