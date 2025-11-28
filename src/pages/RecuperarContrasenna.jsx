// src/pages/RecuperarContrasenna.jsx
import "../assets/styles/RecuperarContrasenna.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { solicitarCodigoRecuperacion } from "../services/UsuarioService";

export default function RecuperarContrasenna() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cargando) return;

    setError("");
    setMensaje("");

    if (!email.trim()) {
      setError("El correo es obligatorio.");
      return;
    }

    try {
      setCargando(true);
      const res = await solicitarCodigoRecuperacion(email);
      setMensaje(
        res || "Si el correo existe, se ha enviado un código de recuperación."
      );

      navigate("/actualizar-contrasenna", {
        state: { email },
      });
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Ocurrió un error al solicitar el código.";
      setError(msg);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="main-recuperar">
      <section className="recuperar-section">
        <div className="recuperar-container">
          <h1 className="recuperar-title">Recuperar contraseña</h1>
          <p className="recuperar-subtitle">
            Ingresa tu correo y te enviaremos un código de recuperación.
          </p>

          <form className="recuperar-form" onSubmit={handleSubmit}>
            {error && (
              <p className="recuperar-message error-message">{error}</p>
            )}
            {mensaje && (
              <p className="recuperar-message success-message">{mensaje}</p>
            )}

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                className="form-input"
                type="email"
                placeholder="ejemplo@correo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="recuperar-btn" type="submit" disabled={cargando}>
              {cargando ? "Enviando..." : "Enviar código"}
            </button>

            <div className="recuperar-links">
              <Link to="/login" className="recuperar-link">
                Volver al inicio de sesión
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
