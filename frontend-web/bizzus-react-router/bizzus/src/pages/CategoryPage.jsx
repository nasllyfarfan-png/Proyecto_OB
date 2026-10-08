import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { sizesFor } from '../data/products';
import { getAllProducts } from '../utils/inventory';

const TAG_CLASS = { new: 'tnew', sale: 'tsale', hot: 'thot' };
const TAG_LABEL = { new: 'Nuevo', sale: 'Oferta', hot: 'Popular' };

const CAT_LABELS = { mujer: 'Mujer', hombre: 'Hombre', juvenil: 'Juvenil', niños: 'Niños' };

function ProductCard({ p, onAdd }) {
  const navigate = useNavigate();
  const [selSize, setSelSize] = useState(null);

  return (
    <div className="pcard">
      <div className="pimg" onClick={() => navigate(`/producto/${p.id}`)} style={{ cursor: 'pointer' }}>
        <img src={p.img} alt={p.name} loading="lazy" />
        <div className="ptags">
          {p.tag && <span className={`ptag ${TAG_CLASS[p.tag]}`}>{TAG_LABEL[p.tag]}</span>}
        </div>
        <div className="pacts">
          <button className="pab madd" onClick={e => { e.stopPropagation(); onAdd(p); }}>Añadir al carrito</button>
        </div>
      </div>
      <div className="pstars">{'★'.repeat(p.s)}{'☆'.repeat(5 - p.s)}</div>
      <div className="pname">{p.name}</div>
      <div className="pcat">{p.cat}</div>
      <div className="size-wrap">
        <span className="size-label">Talla:</span>
        <div className="size-btns">
          {sizesFor(p.cat).map(t => (
            <button key={t} className={`sz-btn${selSize === t ? ' sel' : ''}`} onClick={() => setSelSize(t)}>{t}</button>
          ))}
        </div>
      </div>
      <span className="pprice">{p.price}</span>
    </div>
  );
}

export default function CategoryPage({ onAdd }) {
  const { cat } = useParams();
  const navigate = useNavigate();
  const allProds = useMemo(() => getAllProducts(), []);
  const products = allProds.filter(p => p.cat === cat);

  if (!CAT_LABELS[cat]) {
    return (
      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-s)', fontSize: '2rem' }}>Categoría no encontrada</h2>
          <button className="btn btn-dk" style={{ marginTop: '1.5rem' }} onClick={() => navigate('/categorias')}>
            Ver categorías
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="productos" style={{ minHeight: '80vh' }}>
      <div className="ctr">
        <div className="shead rv">
          <span className="stag">Categoría</span>
          <h2 className="stitle">{CAT_LABELS[cat]}</h2>
          <div className="srule"></div>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button className="btn btn-ol" onClick={() => navigate('/categorias')}>
            <i className="fas fa-arrow-left"></i> &nbsp;Todas las categorías
          </button>
        </div>
        {products.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--mist)' }}>No hay productos en esta categoría.</p>
        ) : (
          <div className="pgrid">
            {products.map(p => <ProductCard key={p.id} p={p} onAdd={onAdd} />)}
          </div>
        )}
      </div>
    </section>
  );
}
