import { Link } from "react-router-dom";
import "../assets/styles/Registro.css";
import { getUsuarios, setUsuarios } from "../utils/Usuarios.js";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { useEffect, useState } from "react";
import "../utils/Registro.logic.js";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [contrasenaConfirma, setContrasenaConfirma] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [comuna, setComuna] = useState("");
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
  ]);

  const valform = (e) => {
    e.preventDefault();

    // Limpia mensajes previos
    setError("");

    // Trae usuarios actuales de tu storage/util
    const usuarios = Array.isArray(getUsuarios()) ? getUsuarios() : [];

    // Arma el payload desde tus estados
    const payload = {
      nombre,
      apellido,
      email,
      contrasena,
      contrasenaConfirma,
      telefono,
      direccion,
      comuna,
    };

    // Llama a la lógica pura
    const res = window.RegistroLogic.registrarUsuario(payload, usuarios);

    // Si hay errores, muestra el primero
    if (!res.ok) {
      const firstKey = Object.keys(res.errors || {})[0];
      const msg =
        (firstKey && res.errors[firstKey]) ||
        "Revisa los campos del formulario";
      setError(msg);
      return;
    }

    // Éxito: guarda la nueva lista y navega
    setUsuarios(res.lista);
    navigate(res.redirectPath || "/login");
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
