const TESTIMONIALS = [
  { name: 'Alejandra Gómez', city: 'Bogotá, Colombia', img: 'https://randomuser.me/api/portraits/women/44.jpg', text: '"Increíble calidad en cada prenda. Los colores son exactos a las fotos y el envío llegó rapidísimo. ¡100% recomendado!"' },
  { name: 'Carlos Restrepo', city: 'Medellín, Colombia', img: 'https://randomuser.me/api/portraits/men/32.jpg', text: '"Me encanta el estilo de Bizzus. Siempre encuentro algo que se adapta a mi personalidad. Son mi marca favorita definitivamente."' },
  { name: 'Valentina Torres', city: 'Cali, Colombia', img: 'https://randomuser.me/api/portraits/women/65.jpg', text: '"Excelente atención. Tuve un problema con mi talla y lo resolvieron inmediatamente. La ropa es hermosa y de muy buena calidad."' },
];

export default function Testimonials() {
  return (
    <div className="testi-s">
      <div className="shead rv" style={{ maxWidth: 1280, margin: '0 auto 3rem' }}>
        <span className="stag">Lo que dicen</span>
        <h2 className="stitle">Nuestros clientes</h2>
        <div className="srule"></div>
      </div>
      <div className="tgrid">
        {TESTIMONIALS.map((t, i) => (
          <div key={t.name} className="tc rv" style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="tc-s">★★★★★</div>
            <p className="tc-t">{t.text}</p>
            <div className="tc-a">
              <img className="tc-av-img" src={t.img} alt={t.name} />
              <div>
                <div className="tc-name">{t.name}</div>
                <div className="tc-city">{t.city}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
