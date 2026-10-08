import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import './index.css';

// Layout
import Navbar    from './components/Navbar';
import Footer    from './components/Footer';
import CartDrawer from './components/CartDrawer';
import LoginModal from './components/LoginModal';
import PayModal   from './components/PayModal';
import Toasts     from './components/Toasts';
import { useToast } from './hooks/useToast';
import LoginRequiredModal from "./components/LoginRequiredModal";

// Pages
import HomePage         from './pages/HomePage';
import ProductsPage     from './pages/ProductsPage';
import CategoriesPage   from './pages/CategoriesPage';
import CategoryPage     from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage        from './pages/AboutPage';
import ContactPage      from './pages/ContactPage';
import ProfilePage      from './pages/ProfilePage';
import InventoryPage    from './pages/InventoryPage';
import NotFoundPage     from './pages/NotFoundPage';
import { isAdmin } from './data/admin';

const API_URL = 'http://localhost:3001/api/v1';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Scroll reveal on route change
function ScrollReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
        { threshold: 0.1 }
      );
      document.querySelectorAll('.rv').forEach(el => obs.observe(el));
      return () => obs.disconnect();
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname]);
  return null;
}

function AppInner() {
  const [cart,      setCart]      = useState(() => JSON.parse(localStorage.getItem('bizzusCart') || '[]'));
  const [user,      setUser]      = useState(() => JSON.parse(localStorage.getItem('bizzusUser') || 'null'));
  const [cartOpen,  setCartOpen]  = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginRequiredOpen, setLoginRequiredOpen] = useState(false);
  const [payOpen,   setPayOpen]   = useState(false);
  const [bttVisible, setBttVisible] = useState(false);
  const { toasts, toast } = useToast();

  useEffect(() => {
    localStorage.setItem('bizzusCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const onScroll = () => setBttVisible(window.scrollY > 480);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const addToCart = useCallback((p) => {
    // No se puede leer la cookie "token" desde JS porque es httpOnly (por seguridad).
    // Usamos el estado `user`, que ya se actualiza en login/logout, para saber si hay sesión activa.
    if (!user) {
      setLoginRequiredOpen(true);
      return;
    }

    setCart((prev) => {
      const ex = prev.find((x) => x.id === p.id);
      if (ex) {
        return prev.map((x) => x.id === p.id ? { ...x, qty: x.qty + 1 } : x);
      }
      return [...prev, { ...p, qty: 1 }];
    });

    setCartOpen(true);
    toast(`"${p.name}" añadido al carrito`, "ok");
  }, [toast, user]);

  const qtyChange = useCallback((id, d) => {
    setCart(prev => prev.map(x => x.id === id ? { ...x, qty: x.qty + d } : x).filter(x => x.qty > 0));
  }, []);

  const removeItem = useCallback((id) => {
    setCart(prev => prev.filter(x => x.id !== id));
    toast('Producto eliminado', 'info');
  }, [toast]);

  const handleLogin = useCallback((u) => {
    setUser(u);
    localStorage.setItem('bizzusUser', JSON.stringify(u));
    toast(`¡Bienvenido/a, ${u.name}! 👋`, 'ok');
  }, [toast]);

  const handleLogout = useCallback(async () => {
    try {
      // Solo el backend puede borrar la cookie httpOnly del token
      await axios.post(`${API_URL}/user/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error('Error al cerrar sesión en el servidor:', error);
    }
    setUser(null);
    localStorage.removeItem('bizzusUser');
    toast('Sesión cerrada correctamente', 'info');
  }, [toast]);

  const handleCheckout = useCallback(() => {
    if (!cart.length) { toast('Tu carrito está vacío', 'err'); return; }
    setCartOpen(false);
    setPayOpen(true);
  }, [cart, toast]);

  const cartCount = cart.reduce((s, x) => s + x.qty, 0);
  const admin = isAdmin(user);

  return (
    <>
      <ScrollToTop />
      <ScrollReveal />

      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
        user={user}
        onLogout={handleLogout}
        isAdmin={admin}
      />

      <main>
        <Routes>
          <Route path="/"                  element={<HomePage />} />
          <Route path="/productos"         element={<ProductsPage onAdd={addToCart} />} />
          <Route path="/categorias"        element={<CategoriesPage />} />
          <Route path="/categorias/:cat"   element={<CategoryPage onAdd={addToCart} />} />
          <Route path="/producto/:id"      element={<ProductDetailPage onAdd={addToCart} />} />
          <Route path="/nosotros"          element={<AboutPage />} />
          <Route path="/contacto"          element={<ContactPage toast={toast} />} />
          <Route path="/perfil"            element={<ProfilePage user={user} onLogout={handleLogout} />} />
          <Route path="/admin/inventario"  element={<InventoryPage user={admin ? user : null} toast={toast} />} />
          <Route path="*"                  element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      <CartDrawer
        cart={cart}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onQty={qtyChange}
        onRemove={removeItem}
        onCheckout={handleCheckout}
      />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={handleLogin}
      />
      <LoginRequiredModal
        open={loginRequiredOpen}
        onClose={() => setLoginRequiredOpen(false)}
        onLogin={() => {
          setLoginRequiredOpen(false);
          setLoginOpen(true);
        }}
        onRegister={() => {
          setLoginRequiredOpen(false);
          setLoginOpen(true);
        }}
      />
      <PayModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        cart={cart}
      />

      <Toasts toasts={toasts} />

      <button
        id="btt"
        className={bttVisible ? 'vis' : ''}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}