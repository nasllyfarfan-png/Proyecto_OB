export default function CartDrawer({ cart, open, onClose, onQty, onRemove, onCheckout }) {
  const total = cart.reduce((s, it) => s + parseInt(it.price.replace(/\D/g, '')) * it.qty, 0);

  return (
    <>
      <div className={`cart-ov${open ? ' open' : ''}`} onClick={onClose}></div>
      <div className={`cart-dr${open ? ' open' : ''}`}>
        <div className="cart-h">
          <h3>Tu carrito</h3>
          <button className="xbtn" onClick={onClose}><i className="fas fa-times"></i></button>
        </div>
        <div className="cart-bd">
          {cart.length === 0 ? (
            <div className="cart-em">
              <i className="fas fa-shopping-bag"></i>
              <p>Tu carrito está vacío</p>
            </div>
          ) : cart.map(it => (
            <div key={it.id} className="cit">
              <img className="cit-img" src={it.img} alt={it.name} />
              <div className="cit-info">
                <div className="cit-name">{it.name}</div>
                <div className="cit-price">{it.price}</div>
                <div className="cit-qty">
                  <button className="qb" onClick={() => onQty(it.id, -1)}>−</button>
                  <span className="qn">{it.qty}</span>
                  <button className="qb" onClick={() => onQty(it.id, 1)}>+</button>
                </div>
              </div>
              <button className="cit-del" onClick={() => onRemove(it.id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          ))}
        </div>
        <div className="cart-ft">
          <div className="ctrow">
            <span>Total estimado</span>
            <strong>${total.toLocaleString('es-CO')}</strong>
          </div>
          <div className="cart-acts">
            <button className="btn btn-dk" style={{ width:'100%', justifyContent:'center' }} onClick={onCheckout}>
              Proceder al pago
            </button>
            <button className="btn btn-ol" style={{ width:'100%', justifyContent:'center' }} onClick={onClose}>
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
