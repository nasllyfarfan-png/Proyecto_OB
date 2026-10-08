import axios from "axios";
import { useState } from "react";

const vEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export default function LoginModal({ open, onClose, onLogin }) {
  const [tab, setTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ em: '', pw: '' });
  const [regForm, setRegForm] = useState({ n: '', a: '', em: '', pw: '' });
  const [loginErrs, setLoginErrs] = useState({});
  const [regErrs, setRegErrs] = useState({});

  const handleLogin = async (e) => {
  e.preventDefault();

  const errs = {};

  if (!vEmail(loginForm.em)) errs.em = true;
  if (!loginForm.pw) errs.pw = true;

  setLoginErrs(errs);

  if (Object.keys(errs).length) return;

  console.log("DATOS QUE SE ENVÍAN:");
  console.log("user_user:", loginForm.em);
  console.log("user_password:", loginForm.pw);

  try {

    const response = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      {
        user_user: loginForm.em,
        user_password: loginForm.pw
      },
      {
        withCredentials: true
      }
    );

    console.log("RESPUESTA DEL BACKEND:", response.data);

    onLogin({
      name: loginForm.em.split("@")[0],
      email: loginForm.em,
      id: response.data.user.id
    });

    onClose();

  } catch (error) {

    console.error("ERROR COMPLETO:", error);
    console.error("STATUS:", error.response?.status);
    console.error("DATA:", error.response?.data);

    alert(
      error.response?.data?.message ||
      "Correo o contraseña incorrectos"
    );
  }
};

  const handleReg = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!regForm.n.trim()) errs.n = true;
    if (!regForm.a.trim()) errs.a = true;
    if (!vEmail(regForm.em)) errs.em = true;
    if (regForm.pw.length < 6) errs.pw = true;
    setRegErrs(errs);
    if (Object.keys(errs).length) return;

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user",
        {
          user_user: regForm.em,
          user_password: regForm.pw,
          userStatus_fk: 1, // TODO: confirmar el id correcto de estado "activo"
          role_fk: 1,       // TODO: confirmar el id correcto de rol por defecto
        },
        { withCredentials: true }
      );

      console.log("USUARIO CREADO:", response.data);

      onLogin({ name: regForm.n, email: regForm.em });
      onClose();

    } catch (error) {
      console.error("ERROR REGISTRO:", error);
      alert(
        error.response?.data?.message ||
        "No se pudo crear la cuenta. Intenta de nuevo."
      );
    }
  };

  if (!open) return null;

  return (
    <div className="mmask open" onClick={e => e.target.classList.contains('mmask') && onClose()}>
      <div className="mbox">
        <button className="mx" onClick={onClose}><i className="fas fa-times"></i></button>

        <div className="mtabs">
          <button className={`mtab${tab === 'login' ? ' on' : ''}`} onClick={() => setTab('login')}>Iniciar sesión</button>
          <button className={`mtab${tab === 'reg' ? ' on' : ''}`} onClick={() => setTab('reg')}>Registrarse</button>
        </div>

        {tab === 'login' && (
          <div className="mpanel on">
            <h2 className="mtitle">Bienvenido de vuelta</h2>
            <form className="mform" onSubmit={handleLogin} noValidate>
              <div className={`fg${loginErrs.em ? ' he' : ''}`}>
                <label>Correo *</label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  className={loginErrs.em ? 'err' : ''}
                  value={loginForm.em}
                  onChange={e => setLoginForm(f => ({...f, em: e.target.value}))}
                />
                <span className="et">Correo inválido</span>
              </div>
              <div className={`fg${loginErrs.pw ? ' he' : ''}`}>
                <label>Contraseña *</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={loginErrs.pw ? 'err' : ''}
                  value={loginForm.pw}
                  onChange={e => setLoginForm(f => ({...f, pw: e.target.value}))}
                />
                <span className="et">Campo requerido</span>
              </div>
              <button type="submit" className="btn btn-dk" style={{ width:'100%', justifyContent:'center' }}>
                Ingresar &nbsp;<i className="fas fa-sign-in-alt"></i>
              </button>
            </form>
            <p className="mhint">¿No tienes cuenta? <a onClick={() => setTab('reg')}>Regístrate gratis</a></p>
          </div>
        )}

        {tab === 'reg' && (
          <div className="mpanel on">
            <h2 className="mtitle">Crea tu cuenta</h2>
            <form className="mform" onSubmit={handleReg} noValidate>
              <div className="frow">
                <div className={`fg${regErrs.n ? ' he' : ''}`}>
                  <label>Nombre *</label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className={regErrs.n ? 'err' : ''}
                    value={regForm.n}
                    onChange={e => setRegForm(f => ({...f, n: e.target.value}))}
                  />
                  <span className="et">Campo requerido</span>
                </div>
                <div className={`fg${regErrs.a ? ' he' : ''}`}>
                  <label>Apellido *</label>
                  <input
                    type="text"
                    placeholder="Tu apellido"
                    className={regErrs.a ? 'err' : ''}
                    value={regForm.a}
                    onChange={e => setRegForm(f => ({...f, a: e.target.value}))}
                  />
                  <span className="et">Campo requerido</span>
                </div>
              </div>
              <div className={`fg${regErrs.em ? ' he' : ''}`}>
                <label>Correo *</label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  className={regErrs.em ? 'err' : ''}
                  value={regForm.em}
                  onChange={e => setRegForm(f => ({...f, em: e.target.value}))}
                />
                <span className="et">Correo inválido</span>
              </div>
              <div className={`fg${regErrs.pw ? ' he' : ''}`}>
                <label>Contraseña *</label>
                <input
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  className={regErrs.pw ? 'err' : ''}
                  value={regForm.pw}
                  onChange={e => setRegForm(f => ({...f, pw: e.target.value}))}
                />
                <span className="et">Mínimo 6 caracteres</span>
              </div>
              <button type="submit" className="btn btn-gd" style={{ width:'100%', justifyContent:'center' }}>
                Crear cuenta &nbsp;<i className="fas fa-user-plus"></i>
              </button>
            </form>
            <p className="mhint">¿Ya tienes cuenta? <a onClick={() => setTab('login')}>Inicia sesión</a></p>
          </div>
        )}
      </div>
    </div>
  );
}