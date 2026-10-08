import { useState, useMemo } from 'react';
import { sizesFor } from '../data/products';
import { getAllProducts } from '../utils/inventory';

const TAG_CLASS = { new: 'tnew', sale: 'tsale', hot: 'thot' };
const TAG_LABEL = { new: 'Nuevo', sale: 'Oferta', hot: 'Popular' };

function ProductCard({ p, onAdd }) {
  const [selSize, setSelSize] = useState(null);
  const sizes = sizesFor(p.cat);

  return (
    <div className="pcard">
      <div className="pimg">
        <img src={p.img} alt={p.name} loading="lazy" />
        <div className="ptags">
          {p.tag && <span className={`ptag ${TAG_CLASS[p.tag]}`}>{TAG_LABEL[p.tag]}</span>}
        </div>
        <div className="pacts">
          <button className="pab madd" onClick={() => onAdd(p)}>Añadir al carrito</button>
        </div>
      </div>
      <div className="pstars">{'★'.repeat(p.s)}{'☆'.repeat(5 - p.s)}</div>
      <div className="pname">{p.name}</div>
      <div className="pcat">{p.cat}</div>
      <div className="size-wrap">
        <span className="size-label">Talla:</span>
        <div className="size-btns">
          {sizes.map(t => (
            <button
              key={t}
              className={`sz-btn${selSize === t ? ' sel' : ''}`}
              onClick={() => setSelSize(t)}
            >{t}</button>
          ))}
        </div>
      </div>
      <span className="pprice">{p.price}</span>
    </div>
  );
}

export default function Products({ onAdd, activeFilter, setActiveFilter, searchText }) {
  const allProds = useMemo(() => getAllProducts(), []);

  const filtered = allProds.filter(p => {
    const matchCat = activeFilter === 'todos' || p.cat === activeFilter;
    const matchSearch = !searchText || p.name.toLowerCase().includes(searchText.toLowerCase());
    return matchCat && matchSearch;
  });

  const filters = ['todos', 'mujer', 'hombre', 'juvenil', 'niños'];

  return (
    <section id="productos">
      <div className="ctr">
        <div className="shead rv">
          <span className="stag">Lo más destacado</span>
          <h2 className="stitle">Nuestros Productos</h2>
          <div className="srule"></div>
        </div>
        <div className="filts rv">
          {filters.map(f => (
            <button
              key={f}
              className={`fb${activeFilter === f ? ' on' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--mist)' }}>No encontramos prendas con esa búsqueda.</p>
        ) : (
          <div className="pgrid">
            {filtered.map(p => <ProductCard key={p.id} p={p} onAdd={onAdd} />)}
          </div>
        )}
      </div>
    </section>
  );
}
