import { useState } from 'react';

const vEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export default function Contact({ toast }) {
  const [form, setForm] = useState({ fn:'', fa:'', fe:'', ft:'', motivo:'', fmsg:'' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const err = (k) => errors[k] ? ' he' : '';

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.fn.trim()) errs.fn = true;
    if (!form.fa.trim()) errs.fa = true;
    if (!vEmail(form.fe.trim())) errs.fe = true;
    if (form.ft && !/^\+?[\d\s\-]{7,15}$/.test(form.ft)) errs.ft = true;
    if (!form.fmsg.trim()) errs.fmsg = true;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSent(true);
    setForm({ fn:'', fa:'', fe:'', ft:'', motivo:'', fmsg:'' });
    toast && toast('¡Mensaje enviado correctamente!', 'ok');
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contacto">
      <div className="cgrid">
        <div className="cinfo rv">
          <span className="stag">Hablemos</span>
          <h2 className="stitle">Contáctanos</h2>
          <p>¿Tienes dudas sobre productos, tallas o pedidos? Escríbenos y te respondemos a la brevedad.</p>
          <div className="citems">
            {[
              { icon:'fa-map-marker-alt', lbl:'Dirección', val:'Dg. 36 #11 24, Soacha, Cundinamarca' },
              { icon:'fa-phone', lbl:'Teléfono', val:'+57 3142985545\n+57 3103200417' },
              { icon:'fa-envelope', lbl:'Correo', val:'Oficialbizzus@gmail.com\nVentasoficial@gmail.com' },
              { icon:'fa-clock', lbl:'Horario', val:'Lun – Vie: 9am – 7pm\nSáb: 10am – 5pm' },
            ].map(c => (
              <div key={c.lbl} className="ci">
                <div className="ciico"><i className={`fas ${c.icon}`}></i></div>
                <div>
                  <div className="cilbl">{c.lbl}</div>
                  <div className="cival" style={{whiteSpace:'pre-line'}}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="soc-s">
            <h4>Redes sociales</h4>
            <div className="soc-row">
              {[
                { icon:'fa-instagram', href:'https://instagram.com' },
                { icon:'fa-facebook-f', href:'https://facebook.com' },
                { icon:'fa-tiktok', href:'https://tiktok.com' },
                { icon:'fa-whatsapp', href:'https://wa.me/573142985545' },
              ].map(s => (
                <a key={s.icon} className="soc-a" href={s.href} target="_blank" rel="noreferrer">
                  <i className={`fab ${s.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="rv" style={{ transitionDelay: '0.14s' }}>
          <div className={`fok${sent ? ' show' : ''}`}>
            <i className="fas fa-check-circle"></i> ¡Mensaje enviado! Te contactaremos pronto.
          </div>
          <form className="cform" onSubmit={handleSubmit} noValidate>
            <div className="frow">
              <div className={`fg${err('fn')}`}>
                <label>Nombre *</label>
                <input type="text" placeholder="Tu nombre" value={form.fn} onChange={e => set('fn', e.target.value)} className={errors.fn ? 'err' : ''} />
                <span className="et">Campo requerido</span>
              </div>
              <div className={`fg${err('fa')}`}>
                <label>Apellido *</label>
                <input type="text" placeholder="Tu apellido" value={form.fa} onChange={e => set('fa', e.target.value)} className={errors.fa ? 'err' : ''} />
                <span className="et">Campo requerido</span>
              </div>
            </div>
            <div className={`fg${err('fe')}`}>
              <label>Correo *</label>
              <input type="email" placeholder="tu@correo.com" value={form.fe} onChange={e => set('fe', e.target.value)} className={errors.fe ? 'err' : ''} />
              <span className="et">Correo inválido</span>
            </div>
            <div className={`fg${err('ft')}`}>
              <label>Teléfono</label>
              <input type="tel" placeholder="+57 310 000 0000" value={form.ft} onChange={e => set('ft', e.target.value)} className={errors.ft ? 'err' : ''} />
              <span className="et">Número inválido</span>
            </div>
            <div className="fg">
              <label>Motivo</label>
              <select value={form.motivo} onChange={e => set('motivo', e.target.value)}>
                <option value="">Selecciona un motivo</option>
                <option>Consulta de producto</option>
                <option>Estado de mi pedido</option>
                <option>Cambios y devoluciones</option>
                <option>Otro</option>
              </select>
            </div>
            <div className={`fg${err('fmsg')}`}>
              <label>Mensaje *</label>
              <textarea placeholder="Escríbenos tu consulta..." value={form.fmsg} onChange={e => set('fmsg', e.target.value)} className={errors.fmsg ? 'err' : ''} />
              <span className="et">Por favor escribe tu mensaje</span>
            </div>
            <button type="submit" className="btn btn-dk" style={{ width:'100%', justifyContent:'center' }}>
              Enviar mensaje &nbsp;<i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
