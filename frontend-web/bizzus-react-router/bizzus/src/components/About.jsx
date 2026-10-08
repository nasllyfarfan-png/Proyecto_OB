import { Link } from "react-router-dom";

export default function About() {

  return (

    <section id="sobre-nosotros">

      <div className="about-g">

        <div className="ai-g rv">

          <div className="ai-main">

            <img
              src="https://i.pinimg.com/736x/4b/3e/a7/4b3ea7ad237a40edc168f690e51cc39f.jpg"
              alt="Pareja a la Moda"
            />

          </div>


          <div className="ai-sm">

            <img
              src="https://i.pinimg.com/736x/07/ad/3c/07ad3cf7f2466ef74e972760ed90557e.jpg"
              alt="Diseño moderno"
            />

          </div>


          <div className="ai-stat">

            <strong>
              4
            </strong>

            <span>
              Años de
              <br />
              experiencia
            </span>

          </div>

        </div>


        <div
          className="atext rv"
          style={{
            transitionDelay: "0.14s"
          }}
        >

          <span className="stag">
            Quiénes somos
          </span>


          <h2 className="stitle">
            La historia detrás de OFICIAL BIZZUS
          </h2>


          <p>
            Somos una marca colombiana nacida en 2022, impulsada por la pasión
            por la moda y el deseo de vestir a personas con estilo propio. Cada
            colección nace del detalle, del tejido impecable y de esa actitud
            que te hace único.
          </p>


          <div className="feats">

            {[
              {
                icon: "fa-leaf",
                title: "Materiales sostenibles",
                desc: "Comprometidos con el planeta y prácticas éticas de producción."
              },
              {
                icon: "fa-medal",
                title: "Calidad garantizada",
                desc: "Control estricto en cada etapa del proceso de fabricación."
              },
              {
                icon: "fa-heart",
                title: "Hecho con amor",
                desc: "Diseños 100% originales colombianos con identidad única."
              }
            ].map((f) => (

              <div
                key={f.title}
                className="feat"
              >

                <div className="ficon">

                  <i
                    className={`fas ${f.icon}`}
                  ></i>

                </div>


                <div className="fbody">

                  <h4>
                    {f.title}
                  </h4>

                  <p>
                    {f.desc}
                  </p>

                </div>

              </div>

            ))}

          </div>


          {/* BOTÓN CONTÁCTANOS */}

          <Link
            to="/contacto"
            className="btn btn-dk"
          >
            Contáctanos &nbsp;
            <i className="fas fa-arrow-right"></i>
          </Link>


        </div>

      </div>

    </section>

  );

}