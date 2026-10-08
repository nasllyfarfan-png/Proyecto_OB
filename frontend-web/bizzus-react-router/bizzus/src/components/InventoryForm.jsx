import { useState } from 'react';
import { formatCOP, parseCOP } from '../utils/inventory';

const CATS = ['mujer', 'hombre', 'juvenil', 'niños'];
const TAGS = [
  { v: '', label: 'Sin etiqueta' },
  { v: 'new', label: 'Nuevo' },
  { v: 'hot', label: 'Popular' },
  { v: 'sale', label: 'Oferta' },
];

const BLANK = {
  name: '', cat: 'mujer', price: '', stock: '', color: '', material: '',
  description: '', img: '', tag: '', s: 5,
};

export default function InventoryForm({ initial, onClose, onSave }) {
  const [f, setF] = useState(() => initial
    ? { ...BLANK, ...initial, price: parseCOP(initial.price) }
    : { ...BLANK });
  const [errs, setErrs] = useState({});

  const change = (e) => setF({ ...f, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!f.name.trim()) errors.name = true;
    if (!f.price || Number(f.price) <= 0) errors.price = true;
    if (f.stock === '' || Number(f.stock) < 0) errors.stock = true;
    if (!f.img.trim()) errors.img = true;
    setErrs(errors);
    if (Object.keys(errors).length) return;

    onSave({
      ...f,
      price: formatCOP(f.price),
      stock: Number(f.stock),
      s: Number(f.s) || 5,
    });
  };

  return (
    <div className="mmask open" onClick={(e) => e.target.classList.contains('mmask') && onClose()}>
      <div className="mbox" style={{ maxWidth: 620 }}>
        <button className="mx" onClick={onClose}><i className="fas fa-times"></i></button>
        <h2 className="mtitle">{initial ? 'Editar prenda' : 'Registrar nueva prenda'}</h2>
        <form className="mform" onSubmit={submit} noValidate>
          <div className="frow">
            <div className={`fg${errs.name ? ' he' : ''}`}>
              <label>Nombre *</label>
              <input name="name" value={f.name} onChange={change} placeholder="Ej: Vestido Lino Crema" />
              <span className="et">Campo requerido</span>
            </div>
            <div className="fg">
              <label>Categoría *</label>
              <select name="cat" value={f.cat} onChange={change}>
                {CATS.map((c) => <option key={c} value={c}>{c[0].toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
          </div>

          <div className="frow">
            <div className={`fg${errs.price ? ' he' : ''}`}>
              <label>Precio (COP) *</label>
              <input type="number" min="0" name="price" value={f.price} onChange={change} placeholder="99000" />
              <span className="et">Ingresa un precio válido</span>
            </div>
            <div className={`fg${errs.stock ? ' he' : ''}`}>
              <label>Stock disponible *</label>
              <input type="number" min="0" name="stock" value={f.stock} onChange={change} placeholder="20" />
              <span className="et">Ingresa el stock disponible</span>
            </div>
          </div>

          <div className="frow">
            <div className="fg">
              <label>Color</label>
              <input name="color" value={f.color} onChange={change} placeholder="Ej: Tierra / Crema" />
            </div>
            <div className="fg">
              <label>Material</label>
              <input name="material" value={f.material} onChange={change} placeholder="Ej: Algodón" />
            </div>
          </div>

          <div className="fg">
            <label>Etiqueta</label>
            <select name="tag" value={f.tag} onChange={change}>
              {TAGS.map((t) => <option key={t.v} value={t.v}>{t.label}</option>)}
            </select>
          </div>

          <div className="fg">
            <label>Descripción</label>
            <textarea name="description" value={f.description} onChange={change} placeholder="Detalles de la prenda..." />
          </div>

          <div className={`fg${errs.img ? ' he' : ''}`}>
            <label>URL de la imagen *</label>
            <input name="img" value={f.img} onChange={change} placeholder="https://..." />
            <span className="et">Agrega una URL de imagen</span>
          </div>

          {f.img && (
            <div style={{ width: 110, height: 130, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src={f.img} alt="Vista previa" onError={(e) => { e.currentTarget.style.opacity = 0.15; }} />
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-ol" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-dk">Guardar prenda</button>
          </div>
        </form>
      </div>
    </div>
  );
}
