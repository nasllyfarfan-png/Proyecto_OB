import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/categorias', label: 'Categorías' },
  { to: '/productos', label: 'Productos' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenLogin,
  user,
  onLogout,
  isAdmin
}) {

  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();
  const location = useLocation();


  // ================================
  // SCROLL
  // ================================

  useEffect(() => {

    const onScroll = () =>
      setScrolled(window.scrollY > 60);

    window.addEventListener('scroll', onScroll);

    return () =>
      window.removeEventListener('scroll', onScroll);

  }, []);


  // ================================
  // CERRAR MENÚ MÓVIL
  // ================================

  useEffect(() => {

    setMobOpen(false);

  }, [location.pathname]);


  // ================================
  // BUSCAR PRODUCTOS
  // ================================

  const handleSearch = () => {

    if (!search.trim()) return;

    navigate(
      `/productos?q=${encodeURIComponent(
        search.trim()
      )}`
    );

  };


  // ================================
  // LINK ACTIVO
  // ================================

  const isActive = (to) => {

    if (to === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(to);

  };


  return (

    <>

      {/* ================================
          TOPBAR
      ================================= */}

      <div className="topbar">
        <em>Nueva colección disponible</em>
      </div>


      {/* ================================
          NAVBAR
      ================================= */}

      <header
        id="nav"
        className={scrolled ? 'shadow' : ''}
      >

        <div className="nav-inner">


          {/* ================================
              LOGO
          ================================= */}

          <Link
            className="logo"
            to="/"
          >

            <div className="logo-mark">
              B
            </div>

            <div className="logo-name">

              OFICIAL BIZZUS

              <small>
                Moda Colombiana
              </small>

            </div>

          </Link>


          {/* ================================
              LINKS
          ================================= */}

          <nav className="nav-links">

            {NAV_LINKS.map(
              ({ to, label }) => (

                <Link
                  key={to}
                  to={to}
                  className={
                    isActive(to)
                      ? 'active'
                      : ''
                  }
                >
                  {label}
                </Link>

              )
            )}

          </nav>


          {/* ================================
              BUSCADOR
          ================================= */}

          <div className="search-box">

            <input
              type="text"
              placeholder="Buscar en Oficial Bizzus"
              value={search}
              onChange={e =>
                setSearch(e.target.value)
              }
              onKeyDown={e =>
                e.key === 'Enter' &&
                handleSearch()
              }
            />

            <button
              onClick={handleSearch}
            >
              <i className="fas fa-search"></i>
            </button>

          </div>


          {/* ================================
              ACCIONES
          ================================= */}

          <div className="nav-actions">

            {!user ? (

              // ================================
              // NO HAY USUARIO
              // ================================

              <button
                className="nb"
                onClick={onOpenLogin}
                title="Iniciar sesión"
              >
                <i className="fas fa-user"></i>
              </button>

            ) : (

              // ================================
              // USUARIO LOGUEADO
              // ================================

              <div
                className="upill"
                tabIndex={0}
              >

                <div className="uav">
                  {user.name[0].toUpperCase()}
                </div>

                <span>
                  {user.name}
                </span>

                <i
                  className="fas fa-chevron-down"
                  style={{
                    fontSize: '0.55rem',
                    color: 'var(--mist)'
                  }}
                >
                </i>


                {/* ================================
                    MENÚ DEL USUARIO
                ================================= */}

                <div className="udrop">


                  {/* MI PERFIL */}

                  <Link to="/perfil">

                    <i
                      className="fas fa-user-circle"
                      style={{
                        color: 'var(--gold)'
                      }}
                    ></i>

                    Mi perfil

                  </Link>


                  {/* MIS PEDIDOS */}

                  <Link to="/pedidos">

                    <i
                      className="fas fa-box-open"
                      style={{
                        color: 'var(--gold)'
                      }}
                    ></i>

                    Mis pedidos

                  </Link>


                  {/* INVENTARIO */}

                  {isAdmin && (

                    <Link
                      to="/admin/inventario"
                    >

                      <i
                        className="fas fa-boxes-stacked"
                        style={{
                          color: 'var(--gold)'
                        }}
                      ></i>

                      Inventario

                    </Link>

                  )}


                  {/* SEPARADOR */}

                  <div className="sep"></div>


                  {/* CERRAR SESIÓN */}

                  <button
                    className="lout-btn"
                    onClick={onLogout}
                  >

                    <i className="fas fa-sign-out-alt"></i>

                    Cerrar sesión

                  </button>

                </div>

              </div>

            )}


            {/* ================================
                CARRITO
            ================================= */}

            <button
              className="nb"
              onClick={onOpenCart}
              title="Carrito"
            >

              <i className="fas fa-shopping-bag"></i>

              <span className="cbadge">
                {cartCount}
              </span>

            </button>


            {/* ================================
                HAMBURGUESA
            ================================= */}

            <button
              className={`ham${mobOpen ? ' open' : ''}`}
              onClick={() =>
                setMobOpen(!mobOpen)
              }
              aria-label="Menú"
            >

              <span></span>
              <span></span>
              <span></span>

            </button>

          </div>

        </div>

      </header>


      {/* ================================
          FONDO MENÚ MÓVIL
      ================================= */}

      <div
        className={`mob-bg${mobOpen ? ' open' : ''}`}
        onClick={() =>
          setMobOpen(false)
        }
      >
      </div>


      {/* ================================
          MENÚ MÓVIL
      ================================= */}

      <nav
        className={`mob-menu${mobOpen ? ' open' : ''}`}
      >

        {NAV_LINKS.map(
          ({ to, label }) => (

            <Link
              key={to}
              to={to}
            >
              {label}
            </Link>

          )
        )}


        {!user ? (

          <button
            className="ml"
            onClick={() => {

              onOpenLogin();
              setMobOpen(false);

            }}
          >
            Iniciar sesión
          </button>

        ) : (

          <>

            {/* MI PERFIL */}

            <Link
              to="/perfil"
              style={{
                color: 'var(--gold)'
              }}
            >
              Mi perfil
            </Link>


            {/* MIS PEDIDOS */}

            <Link
              to="/pedidos"
              style={{
                color: 'var(--gold)'
              }}
            >
              Mis pedidos
            </Link>


            {/* INVENTARIO */}

            {isAdmin && (

              <Link
                to="/admin/inventario"
                style={{
                  color: 'var(--gold)'
                }}
              >
                Inventario
              </Link>

            )}


            {/* CERRAR SESIÓN */}

            <button
              className="ml"
              style={{
                color: 'var(--rust)'
              }}
              onClick={() => {

                onLogout();
                setMobOpen(false);

              }}
            >
              Cerrar sesión
            </button>

          </>

        )}

      </nav>

    </>

  );

}