import { useNavigate } from 'react-router-dom';

export default function ProfilePage({ user, onLogout }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--border)' }}>
            <i className="fas fa-user-lock"></i>
          </div>
          <h2 style={{ fontFamily: 'var(--font-s)', fontSize: '2rem', marginBottom: '0.5rem' }}>Acceso restringido</h2>
          <p style={{ color: 'var(--mist)', marginBottom: '1.5rem' }}>Debes iniciar sesión para ver tu perfil.</p>
          <button className="btn btn-dk" onClick={() => navigate('/')}>
            <i className="fas fa-home"></i> &nbsp;Ir al inicio
          </button>
        </div>
      </section>
    );
  }

  const initials = user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <section style={{ background: 'var(--cream)', minHeight: '80vh', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ background: 'var(--ink)', borderRadius: 16, padding: '2.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-s)', fontSize: '2rem', fontWeight: 700, color: 'var(--ink)', flexShrink: 0 }}>
            {initials}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-s)', fontSize: '1.8rem', color: '#fff', fontWeight: 700 }}>{user.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', marginTop: '0.2rem' }}>{user.email}</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(201,162,74,0.15)', border: '1px solid rgba(201,162,74,0.3)', color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.25rem 0.75rem', borderRadius: 20, marginTop: '0.6rem' }}>
              <i className="fas fa-check-circle"></i> Cuenta activa
            </div>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: 'fa-box-open', label: 'Mis pedidos', val: '6', sub: 'Con pedidos', color: 'var(--gold)' },
            { icon: 'fa-map-marker-alt', label: 'Direcciones', val: '1', sub: 'Con direcciones', color: '#3498db' },
          ].map(c => (
            <div key={c.label} style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,.06)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${c.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, fontSize: '1.1rem', flexShrink: 0 }}>
                <i className={`fas ${c.icon}`}></i>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-s)', fontSize: '1.5rem', fontWeight: 700 }}>{c.val}</div>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mist)' }}>{c.label}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--mist)', marginTop: 2 }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div style={{ background: '#fff', borderRadius: 12, padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,.06)', marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-s)', fontSize: '1.3rem', marginBottom: '1.5rem' }}>Información de cuenta</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[['Nombre completo', user.name], ['Correo electrónico', user.email], ['Teléfono', '310 123 4567'], ['Ciudad', 'Bogota']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mist)' }}>{k}</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-ol" onClick={() => navigate('/')}>
            <i className="fas fa-home"></i> &nbsp;Ir al inicio
          </button>
          <button className="btn btn-ol" onClick={() => navigate('/productos')}>
            <i className="fas fa-shopping-bag"></i> &nbsp;Ver productos
          </button>
          <button className="btn btn-dk" onClick={() => { onLogout(); navigate('/'); }}
            style={{ background: 'var(--rust)', marginLeft: 'auto' }}>
            <i className="fas fa-sign-out-alt"></i> &nbsp;Cerrar sesión
          </button>
        </div>
      </div>
    </section>
  );
}
