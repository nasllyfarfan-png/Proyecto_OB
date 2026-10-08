# OFICIAL BIZZUS — React

Proyecto React con Vite convertido desde el HTML original.

## Estructura

```
src/
  components/
    Navbar.jsx        — Topbar, nav, búsqueda, menú móvil, link a Inventario (solo admin)
    Hero.jsx          — Sección inicio
    Categories.jsx    — Sección categorías (4 tarjetas)
    Products.jsx      — Catálogo con filtros y búsqueda (sin CRUD, solo lectura)
    Featured.jsx      — Colección exclusiva
    About.jsx         — Sobre nosotros
    Testimonials.jsx  — Testimonios de clientes
    Contact.jsx       — Formulario de contacto
    Footer.jsx        — Pie de página
    CartDrawer.jsx    — Panel lateral del carrito
    LoginModal.jsx    — Modal login / registro
    LoginRequiredModal.jsx — Aviso cuando se intenta comprar sin sesión
    PayModal.jsx      — Modal de pago (Nequi, Daviplata, PSE)
    Toasts.jsx        — Notificaciones emergentes
    InventoryForm.jsx — Modal para crear/editar una prenda del inventario
  pages/
    ...               — Home, Productos, Categorías, Categoría, Detalle, Perfil, Nosotros, Contacto
    InventoryPage.jsx — Panel de inventario (ruta /admin/inventario, solo admin)
  data/
    products.js       — Catálogo base (32 prendas) + función sizesFor
    admin.js           — Correo de administrador y función isAdmin(user)
  utils/
    inventory.js       — Fusiona catálogo base + prendas agregadas desde el panel,
                          y expone addProduct / updateProduct / deleteProduct
    cookies.js
  hooks/
    useToast.js        — Hook para notificaciones
  App.jsx              — Componente raíz con todo el estado y las rutas
  main.jsx             — Punto de entrada React
  index.css            — Todos los estilos (equivalente a style.css)
```

## Inventario (panel de administrador)

- Ruta: `/admin/inventario`.
- Muestra estadísticas (productos, unidades, stock saludable/bajo), buscador, filtro por
  categoría, y permite crear, editar y eliminar prendas mediante un formulario (ya no con
  `prompt()` como antes).
- Las prendas que agregues ahí aparecen automáticamente en el catálogo, las categorías y el
  detalle de producto, porque todas las páginas leen del mismo lugar (`src/utils/inventory.js`).
- Las 32 prendas del catálogo base (definidas en `src/data/products.js`) se pueden ver en el
  inventario pero no se pueden editar ni eliminar desde ahí, para no perder el catálogo original;
  solo se gestionan las prendas agregadas desde el panel.
- **Acceso**: el backend de login (`/api/v1/user/login`) todavía no devuelve un campo de rol, así
  que por ahora el panel se muestra únicamente si el correo de la sesión es
  `admin@bizzus.com` (constante en `src/data/admin.js`). Esto es un candado de frontend para el
  prototipo — en producción el rol debe validarse también en el backend.

## Instalación

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Build producción

```bash
npm run build
npm run preview
```
