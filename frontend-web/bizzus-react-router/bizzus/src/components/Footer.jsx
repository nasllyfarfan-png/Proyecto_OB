import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="ftop">
        <div className="fbrand">
          <Link className="logo" to="/">
            <div className="logo-mark">B</div>
            <div className="logo-name" style={{ color: 'var(--white)' }}>
              OFICIAL BIZZUS<small>Moda Colombiana</small>
            </div>
          </Link>
          <p>
            Desde 2022, nuestra marca colombiana convierte la moda en un lienzo
            donde tu estilo cobra vida. Cinco años que nos respaldan, creando
            prendas con calidad excepcional y una esencia auténtica en cada detalle.
          </p>
        </div>
        <div className="fcol">
          <h5>Navegación</h5>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/categorias">Categorías</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/nosotros">Sobre nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>
        <div className="fcol">
          <h5>Contacto</h5>
          <ul>
            <li><a href="tel:+573142985545"><i className="fas fa-phone"></i>+57 3142985545</a></li>
            <li><a href="mailto:Officialbizzus@gmail.com"><i className="fas fa-envelope"></i>Officialbizzus@gmail.com</a></li>
            <li><a href="#"><i className="fas fa-map-marker-alt"></i>Bogotá, Colombia</a></li>
            <li><a href="https://wa.me/573142985545" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i>WhatsApp</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i>Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="fbot">
        <p>© 2022 <em>OFICIAL BIZZUS</em>. Todos los derechos de autor reservados.</p>
      </div>
    </footer>
  );
}
