import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="inicio">

      <div className="hero-text">

        <h1 className="h-title">
          Viste con
          <br />
          <em>carácter</em> y
          <br />
          actitud
        </h1>

        <p className="h-desc">
          En OFICIAL BIZZUS cada prenda es una declaración. Diseños colombianos
          con alma propia, tejidos premium y un estilo que no pide permiso.
        </p>

        <div className="bgrp">

          {/* EXPLORAR COLECCIÓN */}
          <Link
            to="/productos"
            className="btn btn-dk"
          >
            Explorar Colección&nbsp;
            <i className="fas fa-arrow-right"></i>
          </Link>


          {/* SOBRE NOSOTROS */}
          <Link
            to="/nosotros"
            className="btn btn-ol"
          >
            Sobre Nosotros
          </Link>

        </div>

      </div>


      <div className="hero-imgs rv">

        <div className="hi-main">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
            alt="Colección Oficial Bizzus"
          />
        </div>

        <div className="hi-sm">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
            alt="Moda urbana"
          />
        </div>

        <div className="hi-float">
          <strong>+500</strong>

          <span>
            Clientes
            <br />
            Satisfechos
          </span>
        </div>

      </div>

    </section>
  );
}