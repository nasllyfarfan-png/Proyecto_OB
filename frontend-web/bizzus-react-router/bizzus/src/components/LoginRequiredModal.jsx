export default function LoginRequiredModal({
  open,
  onClose,
  onLogin,
  onRegister
}) {
  if (!open) return null;

  return (
    <div
      className="mmask open"
      onClick={(e) => {
        if (e.target.classList.contains("mmask")) onClose();
      }}
    >
      <div className="mbox" style={{ maxWidth: "420px", textAlign: "center" }}>

        <button className="mx" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div style={{ padding: "15px 10px" }}>

          <i
            className="fas fa-shopping-cart"
            style={{
              fontSize: "55px",
              color: "#c9a24a",
              marginBottom: "20px"
            }}
          ></i>

          <h2 className="mtitle">
            ¡Hola!
          </h2>

          <p
            style={{
              color: "#666",
              marginBottom: "30px",
              lineHeight: 1.6
            }}
          >
            Para agregar productos al carrito debes iniciar sesión.
          </p>

          <button
            className="btn btn-dk"
            style={{
              width: "100%",
              justifyContent: "center",
              marginBottom: "12px"
            }}
            onClick={onLogin}
          >
            Iniciar sesión
          </button>

          <button
            className="btn btn-ol"
            style={{
              width: "100%",
              justifyContent: "center"
            }}
            onClick={onRegister}
          >
            Crear cuenta
          </button>

        </div>

      </div>
    </div>
  );
}