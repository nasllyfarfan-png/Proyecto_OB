const FEATURED = [
  'https://i.pinimg.com/736x/ea/fb/ff/eafbff12d578282186ba0cec8a24a5ab.jpg',
  'https://i.pinimg.com/736x/51/73/2a/51732a767a2f017d6d98e31b39fb2533.jpg',
  'https://i.pinimg.com/736x/fe/d1/0a/fed10aab379c4be98f69ebc74aca7feb.jpg',
  'https://i.pinimg.com/736x/54/91/e0/5491e0beae4c58e1c4e641502334c86d.jpg',
];

export default function Featured() {
  return (
    <section className="featured">
      <div className="ctr">
        <div className="shead">
          <span className="stag">Colección exclusiva</span>
          <h2 className="stitle">Estilo que marca tendencia</h2>
          <div className="srule"></div>
        </div>
        <div className="categorias">
          {FEATURED.map((img, i) => (
            <div key={i} className="tarjeta visible">
              <img src={img} alt={`Colección ${i+1}`} loading="lazy" />
              <div className="gradiente"></div>
              <div className="info"><div className="subtitulo"></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
