import { useNavigate } from 'react-router-dom';

const CATS = [
  { id: 'mujer',   name: 'Mujer',   img: 'https://i.pinimg.com/564x/14/e3/48/14e348643988ab92efcef1ad29161922.jpg' },
  { id: 'hombre',  name: 'Hombre',  img: 'https://allinoutfits.com/wp-content/uploads/Mejores-outfits-hombre-formales-con-ropa-actual-en-tendencia.jpg' },
  { id: 'juvenil', name: 'Juvenil', img: 'https://i.pinimg.com/736x/79/fd/f5/79fdf5e7d433a20766a77554bb06a86a.jpg' },
  { id: 'niños',   name: 'Niños',   img: 'https://i.pinimg.com/736x/96/d1/6f/96d16f67bdc54b4c90b4fd40359adae6.jpg'},
];

export default function CategoriesPage() {
  const navigate = useNavigate();

  return (
    <section id="categorias" style={{ minHeight: '80vh' }}>
      <div className="ctr">
        <div className="shead rv">
          <span className="stag">Explora</span>
          <h2 className="stitle">Nuestras Categorías</h2>
          <div className="srule"></div>
        </div>
        <div className="cats">
          {CATS.map((c, i) => (
            <div
              key={c.id}
              className="cc rv"
              style={{ transitionDelay: `${i * 0.07}s` }}
              onClick={() => navigate(`/categorias/${c.id}`)}
            >
              <img src={c.img} alt={c.name} loading="lazy" />
              <div className="cc-gr"></div>
              <div className="cc-info">
                <div className="cc-name">{c.name}</div>
                <div className="cc-sub">{c.desc}</div>
              </div>
              <div className="cc-pill"><i className="fas fa-arrow-right"></i></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
