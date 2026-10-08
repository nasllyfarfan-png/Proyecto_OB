import { useState } from 'react';

export default function PayModal({ open, onClose, cart }) {
  const [openPay, setOpenPay] = useState(null);
  const total = cart.reduce((s, it) => s + parseInt(it.price.replace(/\D/g, '')) * it.qty, 0);
  const resumen = cart.map(it => `• ${it.name} x${it.qty} — ${it.price}`).join('\n');

  const toggle = (id) => setOpenPay(openPay === id ? null : id);

  if (!open) return null;

  return (
    <div className="mmask open" onClick={e => e.target.classList.contains('mmask') && onClose()}>
      <div className="mbox" style={{ maxWidth: 420 }}>
        <button className="mx" onClick={onClose}><i className="fas fa-times"></i></button>
        <h2 className="mtitle">Elige tu método de pago</h2>
        <div style={{ background:'#f5f5f5', borderRadius:8, padding:12, marginBottom:'1.2rem', fontSize:13, whiteSpace:'pre-line', lineHeight:1.7 }}>
          {resumen}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.4rem' }}>
          <span style={{ fontSize:14, color:'#888' }}>Total a pagar</span>
          <strong style={{ fontSize:'1.2rem' }}>${total.toLocaleString('es-CO')}</strong>
        </div>

        {[
          { id:'nequi', label:'Nequi', bg:'#6B0FA8', phone:'3134644411' },
          { id:'daviplata', label:'Daviplata', bg:'#ED1C24', phone:'3103200417' },
        ].map(m => (
          <div key={m.id} className="pay-opt">
            <div className="pay-opt-head" onClick={() => toggle(m.id)}>
              <span style={{ background:m.bg, color:'#fff', padding:'4px 12px', borderRadius:5, fontSize:13, fontWeight:600 }}>{m.label}</span>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div className={`pay-opt-body${openPay === m.id ? ' open' : ''}`}>
              <p>Envía el pago al número:</p>
              <strong><i className="fas fa-phone"></i> {m.phone}</strong>
              <p style={{ marginTop:6, fontSize:12, color:'#888' }}>Envía el comprobante a nuestro WhatsApp para confirmar tu pedido.</p>
            </div>
          </div>
        ))}

        <div className="pay-opt">
          <div className="pay-opt-head" onClick={() => toggle('pse')}>
            <span style={{ background:'#003087', color:'#fff', padding:'4px 12px', borderRadius:5, fontSize:13, fontWeight:600 }}>PSE</span>
            <i className="fas fa-chevron-down"></i>
          </div>
          <div className={`pay-opt-body${openPay === 'pse' ? ' open' : ''}`}>
            <p>Transferencia bancaria:</p>
            <strong>🏦 Bancolombia</strong>
            <p style={{ marginTop:4 }}>Cuenta de ahorros: <strong>123-456789-00</strong></p>
            <p>A nombre de: <strong>Oficial Bizzus</strong></p>
            <p style={{ marginTop:6, fontSize:12, color:'#888' }}>Envía el comprobante a nuestro WhatsApp para confirmar tu pedido.</p>
          </div>
        </div>

        <a
          className="btn btn-dk"
          style={{ width:'100%', justifyContent:'center', marginTop:'1.2rem', textDecoration:'none', display:'flex' }}
          href="https://wa.me/573142985545?text=Hola%2C%20quiero%20confirmar%20mi%20pedido%20en%20Oficial%20Bizzus%20%F0%9F%9B%8D%EF%B8%8F"
          target="_blank"
          rel="noreferrer"
        >
          Enviar comprobante por WhatsApp &nbsp;<i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </div>
  );
}
