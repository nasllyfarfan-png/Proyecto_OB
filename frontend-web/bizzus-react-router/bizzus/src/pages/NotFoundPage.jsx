import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { getAllProducts } from '../utils/inventory';

const ESTADO_STYLE = {
  Entregado: { color: '#2e7d32', bg: '#e8f5e9', icon: 'fa-check-circle' },
  'En camino': { color: '#b8860b', bg: '#fdf3e0', icon: 'fa-truck' },
  Procesando: { color: '#666', bg: '#f0f0f0', icon: 'fa-clock' },
};

function Estrellas({ rating = 0 }) {
  return (
    <div style={{ color: 'var(--gold)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </div>
  );
}

function TarjetaProducto({ producto }) {
  return (
    <div
      style={{
        width: 170,
        flexShrink: 0,
        background: '#fff',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
        border: '1px solid #eee',
        transition: 'transform 0.2s',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '3 / 4', background: 'var(--warm)' }}>
        <img
          src={producto.img}
          alt={producto.name}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
      </div>
      <div style={{ padding: '0.85rem' }}>
        <Estrellas rating={producto.s} />
        <div style={{ fontFamily: 'var(--font-s)', color: 'var(--gold)', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>
          {producto.name}
        </div>
        <div style={{ fontSize: '0.7rem', color: '#1a5fb4', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 2 }}>
          {producto.cat}
        </div>
        <div style={{ fontWeight: 700, marginTop: '0.4rem', fontSize: '0.95rem' }}>
          {producto.price}
        </div>
      </div>
    </div>
  );
}

function TarjetaPedido({ pedido }) {
  const estilo = ESTADO_STYLE[pedido.estado] || ESTADO_STYLE.Procesando;
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #eee',
        borderRadius: 16,
        padding: '1.5rem',
        boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '1.25rem',
          paddingBottom: '1rem',
          borderBottom: '1px dashed #e5e5e5',
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--font-s)', fontWeight: 700, fontSize: '1.1rem' }}>
            Pedido #{pedido.id}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--mist)', marginTop: 2 }}>
            <i className="far fa-calendar" style={{ marginRight: 6 }}></i>
            {pedido.fecha}
          </div>
        </div>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.78rem',
            fontWeight: 700,
            color: estilo.color,
            background: estilo.bg,
            padding: '0.35rem 0.75rem',
            borderRadius: 999,
          }}
        >
          <i className={`fas ${estilo.icon}`}></i>
          {pedido.estado}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.35rem' }}>
        {pedido.productos.map((prod) => (
          <TarjetaProducto key={prod.id} producto={prod} />
        ))}
      </div>
    </div>
  );
}

export default function NotFoundPage() {
  const navigate = useNavigate();
  const allProds = useMemo(() => getAllProducts(), []);
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // NOTA: esto arma pedidos de ejemplo con productos reales de tu catálogo.
    // Reemplázalo por tu fuente real de pedidos (carrito guardado, backend, etc.)
    // cuando la tengas: fetch('/api/pedidos').then(r => r.json()).then(setPedidos)
    if (allProds.length === 0) {
      setCargando(false);
      return;
    }
    const timer = setTimeout(() => {
      const demoPedidos = [
        { id: '1024', fecha: '2025-08-10', estado: 'Entregado', productos: allProds.slice(0, 2) },
        { id: '1031', fecha: '2025-08-18', estado: 'En camino', productos: allProds.slice(2, 3) },
        { id: '1045', fecha: '2025-08-22', estado: 'Procesando', productos: allProds.slice(3, 6) },
      ].filter(p => p.productos.length > 0);
      setPedidos(demoPedidos);
      setCargando(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [allProds]);

  return (
    <section style={{ minHeight: '80vh', padding: '5rem 2rem', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-s)', fontSize: '2rem', marginBottom: '1.5rem', lineHeight: 1.3 }}>
          Ten la libertad de usar lo que te haga sentir
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--gold)', display: 'inline-block', marginTop: '0.5rem' }}>Única</em>
        </h2>
        <p style={{ color: 'var(--mist)', marginBottom: '2rem', maxWidth: 460, margin: '0 auto 2rem' }}>
          El estilo perfecto también se toma un descanso; esta página decidió tomarse el suyo.
          Mientras tanto, te invitamos a seguir explorando las piezas que sí te esperan.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <button className="btn btn-dk" onClick={() => navigate('/')}>
            <i className="fas fa-home"></i> &nbsp;Ir al inicio
          </button>
          <button className="btn btn-ol" onClick={() => navigate('/productos')}>
            Ver productos
          </button>
        </div>

        <div style={{ textAlign: 'left' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="stag">Historial</span>
            <h2 style={{ fontFamily: 'var(--font-s)', fontSize: '1.8rem', fontWeight: 700, marginTop: '0.35rem' }}>
              Mis pedidos
            </h2>
            <div style={{ width: 60, height: 3, background: 'var(--gold)', margin: '0.75rem auto 0', borderRadius: 3 }} />
          </div>

          {cargando && (
            <p style={{ textAlign: 'center', color: 'var(--mist)' }}>
              <i className="fas fa-spinner fa-spin" style={{ marginRight: 8 }}></i>
              Cargando pedidos...
            </p>
          )}

          {!cargando && pedidos.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--mist)' }}>Todavía no tienes pedidos.</p>
          )}

          {!cargando && pedidos.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {pedidos.map((pedido) => (
                <TarjetaPedido key={pedido.id} pedido={pedido} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}