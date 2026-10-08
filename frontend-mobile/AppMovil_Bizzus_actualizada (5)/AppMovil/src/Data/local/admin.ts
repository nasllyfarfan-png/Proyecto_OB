// Igual que en la web (src/data/admin.js): el backend todavía no maneja
// roles, así que identificamos al administrador por su correo en el
// frontend. Es un criterio solo de prototipo.
export const ADMIN_EMAIL = 'admin@bizzus.com';

export function isAdmin(user?: { email?: string } | null): boolean {
    return !!user && (user.email || '').toLowerCase() === ADMIN_EMAIL;
}
