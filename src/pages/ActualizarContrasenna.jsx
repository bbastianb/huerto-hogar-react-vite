import "../assets/styles/ActualizarContrasenna.css";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { resetearContrasena } from "../services/UsuarioService";

export default function ActualizarContrasenna() {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [contrasenaNueva, setContrasenaNueva] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const emailState = location.state?.email;
    if (emailState) setEmail(emailState);
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cargando) return;

    setError("");
    setMensaje("");

    if (!email.trim() || !codigo.trim() || !contrasenaNueva.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (contrasenaNueva.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (contrasenaNueva !== confirmarContrasena) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setCargando(true);
      const res = await resetearContrasena(email, codigo, contrasenaNueva);
      setMensaje(res || "Contraseña actualizada correctamente.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Ocurrió un error al actualizar la contraseña.";
      setError(msg);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="main-actualizar">
      <section className="actualizar-section">
        <div className="actualizar-container">
          <h1 className="actualizar-title">Actualizar contraseña</h1>
          <p className="actualizar-subtitle">
            Ingresa el correo, el código que te llegó y tu nueva contraseña.
          </p>

          <form className="actualizar-form" onSubmit={handleSubmit}>
            {error && (
              <p className="actualizar-message error-message">{error}</p>
            )}
            {mensaje && (
              <p className="actualizar-message success-message">{mensaje}</p>
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

            <div className="form-group">
              <label htmlFor="codigo">Código de recuperación</label>
              <input
                id="codigo"
                className="form-input"
                type="text"
                placeholder="Código recibido"
                required
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contrasenaNueva">Nueva contraseña</label>
              <input
                id="contrasenaNueva"
                className="form-input"
                type="password"
                placeholder="Nueva contraseña"
                required
                value={contrasenaNueva}
                onChange={(e) => setContrasenaNueva(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmarContrasena">
                Confirmar nueva contraseña
              </label>
              <input
                id="confirmarContrasena"
                className="form-input"
                type="password"
                placeholder="Repite la nueva contraseña"
                required
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
              />
            </div>

            <button
              className="actualizar-btn"
              type="submit"
              disabled={cargando}
            >
              {cargando ? "Actualizando..." : "Actualizar contraseña"}
            </button>

            <div className="actualizar-links">
              <Link to="/login" className="actualizar-link">
                Volver al inicio de sesión
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
