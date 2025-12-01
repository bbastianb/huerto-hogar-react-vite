import "../assets/styles/Registro.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { useEffect, useState } from "react";
import { guardarUsuario } from "../services/UsuarioService";

const REGION_OPTIONS = [
  { value: "ARICA_Y_PARINACOTA", label: "Arica y Parinacota" },
  { value: "TARAPACA", label: "Tarapacá" },
  { value: "ANTOFAGASTA", label: "Antofagasta" },
  { value: "ATACAMA", label: "Atacama" },
  { value: "COQUIMBO", label: "Coquimbo" },
  { value: "VALPARAISO", label: "Valparaíso" },
  { value: "METROPOLITANA", label: "Metropolitana de Santiago" },
  { value: "O_HIGGINS", label: "Libertador Gral. Bernardo O'Higgins" },
  { value: "MAULE", label: "Maule" },
  { value: "NUBLE", label: "Ñuble" },
  { value: "BIOBIO", label: "Biobío" },
  { value: "ARAUCANIA", label: "La Araucanía" },
  { value: "LOS_RIOS", label: "Los Ríos" },
  { value: "LOS_LAGOS", label: "Los Lagos" },
  { value: "AYSEN", label: "Aysén" },
  { value: "MAGALLANES", label: "Magallanes y Antártica Chilena" },
];

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [contrasenaConfirma, setContrasenaConfirma] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [comuna, setComuna] = useState("");
  const [region, setRegion] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [
    nombre,
    apellido,
    email,
    contrasena,
    contrasenaConfirma,
    telefono,
    direccion,
    comuna,
    region,
  ]);

  const valform = async (e) => {
    e.preventDefault();

    // Limpia mensajes previos
    setError("");

    if (contrasena !== contrasenaConfirma) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (contrasena.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    const nuevoUsuario = {
      nombre,
      apellido,
      email,
      contrasenna: contrasena,
      telefono,
      direccion,
      comuna,
      region,
    };

    try {
      await guardarUsuario(nuevoUsuario);
      navigate("/login");
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      let mensaje = "";

      if (err.response && err.response.data) {
        const data = err.response.data;

        if (typeof data === "string") {
          mensaje = data;
        } else if (data.message) {
          mensaje = data.message;
        }
        setError(mensaje);
      }
    }
  };

  return (
    <main className="main-registro">
      <section className="registro-section">
        <h1 className="registro-title">Crear Cuenta</h1>
        <form className="registro-form" onSubmit={valform}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              className="form-input"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              className="form-input"
              required
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-input"
              required
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirm-password"
              className="form-input"
              required
              value={contrasenaConfirma}
              onChange={(e) => setContrasenaConfirma(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Telefono</label>
            <input
              type="text"
              id="telefono"
              className="form-input"
              required
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="direccion">Dirección</label>
            <input
              type="text"
              id="direccion"
              className="form-input"
              required
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="comuna">Comuna</label>
            <input
              type="text"
              id="comuna"
              className="form-input"
              required
              value={comuna}
              onChange={(e) => setComuna(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="region">Región</label>
            <select
              id="region"
              className="form-input"
              required
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">Selecciona una región</option>
              {REGION_OPTIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="registro-btn">
            Registrarse
          </button>
        </form>
      </section>
      <section className="imagen-section">
        <div className="imagen-content">
          <div className="logo-container">
            <img src={logo} alt="Logo Huerto Hogar" />
          </div>
          <h2 className="imagen-title">Únete a Nosotros</h2>
          <p className="imagen-subtitle">
            Comienza tu experiencia con productos frescos
          </p>
        </div>
      </section>
    </main>
  );
}
