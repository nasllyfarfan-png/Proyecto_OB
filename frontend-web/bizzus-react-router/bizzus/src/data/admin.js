// El backend de login (http://localhost:3001/api/v1/user/login) todavía no
// devuelve un campo "role" en la respuesta, así que por ahora identificamos
// al administrador por su correo en el frontend. Esto es solo para el
// prototipo: en producción el rol debe validarse en el backend, nunca
// confiando únicamente en lo que dice el frontend.
export const ADMIN_EMAIL = 'admin@bizzus.com';

export function isAdmin(user) {
  return !!user && user.email?.toLowerCase() === ADMIN_EMAIL;
}
