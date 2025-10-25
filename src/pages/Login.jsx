import "../assets/styles/Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import fondo2 from "../assets/img/fondo2.png";
import { getUsuarios, setUsuarioActual } from "../utils/Usuarios.js";

export const encontrarUsuarioValido = (email, usuarios) => {
  return usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase());
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, ingresa un formato de email válido.");
      return;
    }
    const usuarios = getUsuarios();
    const usuariovalido = usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (usuariovalido && usuariovalido.contrasena === contrasena) {
      setError("");
      const usuarioParaGuardar = {
        id: usuariovalido.id,
        nombre: usuariovalido.nombre,
        apellido: usuariovalido.apellido,
        email: usuariovalido.email,
        tipo: usuariovalido.tipo,
      };
      if (usuariovalido.tipo === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      setUsuarioActual(usuarioParaGuardar);
    } else {
      setError("Email o contraseña incorrectos");
    }
  };

  return (
    <main className="main-login">
      <section className="login-section">
        <div className="login-container">
          <div className="login-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#8B4513"
              width="140"
              height="140"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
          <h1 className="login-title">Inicio de Sesión</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
              <input
                className="form-input"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-input"
                type="password"
                placeholder="Contraseña"
                required
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
            </div>
            <div className="form-links">
              <Link to="/forgot-password" className="forgot-form-link">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <button className="login-btn" type="submit">
              Ingresar
            </button>
            <div className="form-links">
              <Link to="/registro" className="forgot-form-link">
                Registrarme
              </Link>
            </div>
          </form>
        </div>
        <div className="login-fondo">
          <img src={fondo2} alt="Fondo Login" />
        </div>
      </section>
    </main>
  );
}
