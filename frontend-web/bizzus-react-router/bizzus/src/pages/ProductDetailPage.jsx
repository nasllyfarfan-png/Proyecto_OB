import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { sizesFor } from '../data/products';
import { getAllProducts } from '../utils/inventory';

const TAG_CLASS = { new: 'tnew', sale: 'tsale', hot: 'thot' };
const TAG_LABEL = { new: 'Nuevo', sale: 'Oferta', hot: 'Popular' };

export default function ProductDetailPage({ onAdd }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const allProds = useMemo(() => getAllProducts(), []);
  const p = allProds.find(x => x.id === Number(id));
  const [selSize, setSelSize] = useState(null);
  const [added, setAdded] = useState(false);

  if (!p) {
    return (
      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-s)', fontSize: '2rem' }}>Producto no encontrado</h2>
          <button className="btn btn-dk" style={{ marginTop: '1.5rem' }} onClick={() => navigate('/productos')}>
            Ver productos
          </button>
        </div>
      </section>
    );
  }

  const related = allProds.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);

  const handleAdd = () => {
    onAdd(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section style={{ background: 'var(--cream)', minHeight: '80vh', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '2rem', fontSize: '0.8rem', color: 'var(--mist)' }}>
          <span style={{ cursor: 'pointer', color: 'var(--gold)' }} onClick={() => navigate('/')}>Inicio</span>
          <span>/</span>
          <span style={{ cursor: 'pointer', color: 'var(--gold)' }} onClick={() => navigate('/productos')}>Productos</span>
          <span>/</span>
          <span style={{ cursor: 'pointer', color: 'var(--gold)' }} onClick={() => navigate(`/categorias/${p.cat}`)}>{p.cat.charAt(0).toUpperCase() + p.cat.slice(1)}</span>
          <span>/</span>
          <span>{p.name}</span>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Image */}
          <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '3/4', background: 'var(--warm)', boxShadow: '0 25px 60px rgba(0,0,0,.15)' }}>
            <img src={p.img} alt={p.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            {p.tag && (
              <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                <span className={`ptag ${TAG_CLASS[p.tag]}`}>{TAG_LABEL[p.tag]}</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ paddingTop: '1rem' }}>
            <span className="stag">{p.cat.charAt(0).toUpperCase() + p.cat.slice(1)}</span>
            <h1 style={{ fontFamily: 'var(--font-s)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.1 }}>{p.name}</h1>

            <div style={{ color: 'var(--gold)', fontSize: '1rem', marginBottom: '1rem' }}>
              {'★'.repeat(p.s)}{'☆'.repeat(5 - p.s)}
            </div>

            <div style={{ fontFamily: 'var(--font-s)', fontSize: '2rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '1.5rem' }}>
              {p.price}
            </div>

            <p style={{ color: 'var(--mist)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Prenda de la colección <strong>{p.cat}</strong> de OFICIAL BIZZUS. Diseño colombiano con materiales de alta calidad,
              confeccionado con atención al detalle y un estilo que no pide permiso.
            </p>

            {/* Sizes */}
            <div className="size-wrap" style={{ marginBottom: '1.5rem' }}>
              <span className="size-label" style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>Selecciona tu talla:</span>
              <div className="size-btns">
                {sizesFor(p.cat).map(t => (
                  <button key={t} className={`sz-btn${selSize === t ? ' sel' : ''}`} onClick={() => setSelSize(t)}
                    style={{ padding: '8px 16px', fontSize: 14 }}>{t}</button>
                ))}
              </div>
              {!selSize && <p style={{ fontSize: 11, color: 'var(--mist)', marginTop: 6 }}>Por favor selecciona una talla</p>}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button className="btn btn-dk" onClick={handleAdd} style={{ flex: 1, justifyContent: 'center', opacity: !selSize ? 0.6 : 1 }}>
                {added ? <><i className="fas fa-check"></i> &nbsp;¡Añadido!</> : <><i className="fas fa-shopping-bag"></i> &nbsp;Añadir al carrito</>}
              </button>
              <button className="btn btn-ol" onClick={() => navigate(-1)}>
                <i className="fas fa-arrow-left"></i>
              </button>
            </div>

            {/* Details */}
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--warm)', borderRadius: 12, fontSize: '0.85rem', lineHeight: 1.8, color: 'var(--mist)' }}>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[['Categoría', p.cat.charAt(0).toUpperCase() + p.cat.slice(1)], ['Envío', 'A todo Colombia'], ['Garantía', '30 días'], ['Pago', 'Nequi · Daviplata · PSE']].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>{k}</div>
                    <div style={{ color: 'var(--ink)', fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <div className="shead" style={{ marginBottom: '2rem' }}>
              <span className="stag">También te puede gustar</span>
              <h2 className="stitle">Productos relacionados</h2>
              <div className="srule"></div>
            </div>
            <div className="pgrid">
              {related.map(r => (
                <div key={r.id} className="pcard" onClick={() => navigate(`/producto/${r.id}`)} style={{ cursor: 'pointer' }}>
                  <div className="pimg">
                    <img src={r.img} alt={r.name} loading="lazy" />
                    {r.tag && <div className="ptags"><span className={`ptag ${TAG_CLASS[r.tag]}`}>{TAG_LABEL[r.tag]}</span></div>}
                    <div className="pacts">
                      <button className="pab madd" onClick={e => { e.stopPropagation(); onAdd(r); }}>Añadir al carrito</button>
                    </div>
                  </div>
                  <div className="pstars">{'★'.repeat(r.s)}{'☆'.repeat(5 - r.s)}</div>
                  <div className="pname">{r.name}</div>
                  <div className="pcat">{r.cat}</div>
                  <span className="pprice">{r.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
