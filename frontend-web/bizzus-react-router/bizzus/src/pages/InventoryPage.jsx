import { useMemo, useState } from 'react';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../utils/inventory';
import InventoryForm from '../components/InventoryForm';

const CATS = ['mujer', 'hombre', 'juvenil', 'niños'];

export default function InventoryPage({ user, toast }) {
  const [refresh, setRefresh] = useState(0);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('todos');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const products = useMemo(() => getAllProducts(), [refresh]);

  const withStock = products.map((p) => ({ ...p, stock: p.stock ?? 15 }));

  const filtered = withStock.filter((p) => {
    const matchCat = cat === 'todos' || p.cat === cat;
    const matchQ = !q || p.name.toLowerCase().includes(q.toLowerCase());
    return matchCat && matchQ;
  });

  const totalUnits = withStock.reduce((s, p) => s + p.stock, 0);
  const healthy = withStock.filter((p) => p.stock > 10).length;
  const low = withStock.filter((p) => p.stock <= 10).length;

  const openNew = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (p) => { setEditing(p); setFormOpen(true); };

  const save = (data) => {
    if (editing && editing.custom) {
      updateProduct(editing.id, data);
      toast?.('Prenda actualizada correctamente', 'ok');
    } else if (editing && !editing.custom) {
      toast?.('Esta prenda es parte del catálogo base y no se puede editar aquí', 'err');
      setFormOpen(false);
      return;
    } else {
      addProduct(data);
      toast?.('Prenda registrada en el inventario', 'ok');
    }
    setFormOpen(false);
    setRefresh((r) => r + 1);
  };

  const remove = (p) => {
    if (!p.custom) {
      toast?.('Esta prenda es parte del catálogo base y no se puede eliminar aquí', 'err');
      return;
    }
    if (!window.confirm(`¿Eliminar "${p.name}" del inventario?`)) return;
    deleteProduct(p.id);
    toast?.('Prenda eliminada del inventario', 'info');
    setRefresh((r) => r + 1);
  };

  if (!user) {
    return (
      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--border)' }}>
            <i className="fas fa-lock"></i>
          </div>
          <h2 style={{ fontFamily: 'var(--font-s)', fontSize: '2rem' }}>Acceso restringido</h2>
          <p style={{ color: 'var(--mist)' }}>Esta sección solo está disponible para la cuenta de administrador.</p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: 'var(--cream)', minHeight: '85vh', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <span className="stag">Panel administrativo</span>
            <h1 style={{ fontFamily: 'var(--font-s)', fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 700 }}>Inventario de prendas</h1>
            <p style={{ color: 'var(--mist)', fontSize: '0.85rem', marginTop: '0.3rem' }}>Gestiona el catálogo: crea, edita y elimina prendas.</p>
          </div>
          <button className="btn btn-dk" onClick={openNew}><i className="fas fa-plus"></i>&nbsp;Nueva prenda</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: 'fa-tshirt', label: 'Productos', val: products.length, color: 'var(--gold)' },
            { icon: 'fa-boxes-stacked', label: 'Unidades', val: totalUnits, color: '#3498db' },
            { icon: 'fa-circle-check', label: 'Stock saludable', val: healthy, color: '#2e7d32' },
            { icon: 'fa-triangle-exclamation', label: 'Stock bajo', val: low, color: 'var(--rust)' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#fff', borderRadius: 12, padding: '1.3rem', boxShadow: '0 4px 20px rgba(0,0,0,.06)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                <i className={`fas ${s.icon}`}></i>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-s)', fontSize: '1.6rem', fontWeight: 700 }}>{s.val}</div>
                <div style={{ fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mist)' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar prenda..."
            style={{ flex: '1 1 240px', padding: '0.7rem 1rem', border: '1.5px solid var(--border)', borderRadius: 8, fontSize: '0.85rem' }}
          />
          <select value={cat} onChange={(e) => setCat(e.target.value)} style={{ padding: '0.7rem 1rem', border: '1.5px solid var(--border)', borderRadius: 8, fontSize: '0.85rem' }}>
            <option value="todos">Todas las categorías</option>
            {CATS.map((c) => <option key={c} value={c}>{c[0].toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr .8fr .8fr 1fr', gap: '1rem', padding: '0.9rem 1.3rem', background: 'var(--warm)', fontSize: '0.66rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--mist)' }}>
            <span>Prenda</span><span>Categoría</span><span>Precio</span><span>Stock</span><span>Estado</span><span>Acciones</span>
          </div>
          {filtered.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--mist)' }}>No hay prendas que coincidan con la búsqueda.</div>
          )}
          {filtered.map((p) => (
            <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr .8fr .8fr 1fr', gap: '1rem', alignItems: 'center', padding: '0.8rem 1.3rem', borderTop: '1px solid var(--border)', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <div style={{ width: 42, height: 50, borderRadius: 6, overflow: 'hidden', flexShrink: 0, background: 'var(--warm)' }}>
                  <img src={p.img} alt={p.name} />
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{p.name}</div>
                  {!p.custom && <small style={{ color: 'var(--mist)', fontSize: '0.65rem' }}>Catálogo base</small>}
                </div>
              </div>
              <span style={{ textTransform: 'capitalize' }}>{p.cat}</span>
              <span style={{ fontWeight: 600, color: 'var(--gold)' }}>{p.price}</span>
              <span style={{ color: p.stock <= 10 ? 'var(--rust)' : 'inherit', fontWeight: 600 }}>{p.stock}</span>
              <span>
                <span style={{
                  fontSize: '0.65rem', padding: '0.25rem 0.6rem', borderRadius: 20,
                  background: p.stock > 0 ? '#e8f5e9' : '#fdecea',
                  color: p.stock > 0 ? '#2e7d32' : 'var(--rust)',
                }}>{p.stock > 0 ? 'Disponible' : 'Agotado'}</span>
              </span>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button onClick={() => openEdit(p)} title="Editar" style={{ width: 30, height: 30, borderRadius: 6, border: '1px solid var(--border)', background: '#fff', cursor: 'pointer' }}>
                  <i className="fas fa-pen" style={{ fontSize: '0.7rem' }}></i>
                </button>
                <button onClick={() => remove(p)} title="Eliminar" style={{ width: 30, height: 30, borderRadius: 6, border: '1px solid var(--border)', background: '#fff', cursor: 'pointer', color: 'var(--rust)' }}>
                  <i className="fas fa-trash" style={{ fontSize: '0.7rem' }}></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {formOpen && (
        <InventoryForm
          initial={editing}
          onClose={() => setFormOpen(false)}
          onSave={save}
        />
      )}
    </section>
  );
}
