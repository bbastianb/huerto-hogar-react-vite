import { Link } from "react-router-dom";
import "../assets/styles/Registro.css";
import { getUsuarios, setUsuarios } from "../utils/Usuarios.js";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { useEffect, useState } from "react";

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
    setError("");

    if (contrasena !== contrasenaConfirma) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (contrasena.length < 8) {
      setError("La contraseña debe tener menos de 8 caracteres");
      return;
    }

    if (telefono.length < 9) {
      setError("El teléfono debe tener menos de 9 caracteres");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Por favor, ingresa un formato de email válido.");
      return;
    }

    if (!/^[a-zA-Z]+$/.test(nombre)) {
      setError("El nombre solo debe contener letras");
      return;
    }

    if (!/^[a-zA-Z]+$/.test(apellido)) {
      setError("El apellido solo debe contener letras");
      return;
    }

    if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(direccion)) {
      setError(
        "La dirección debe contener tanto letras como números (ej: Calle 123)"
      );
      return;
    }

    if (!/^[a-zA-Z]+$/.test(comuna)) {
      setError("La comuna solo debe contener letras");
      return;
    }

    const usuarios = getUsuarios();
    const nuevoId =
      usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1;

    const nuevoUsuario = {
      id: nuevoId,
      nombre,
      apellido,
      email,
      contrasena,
      telefono,
      direccion,
      comuna,
      tipo: "usuario",
    };

    const emailExiste = usuarios.some((usuario) => usuario.email === email);
    if (emailExiste) {
      setError("Este email ya está registrado");
      return;
    }
    setUsuarios([...usuarios, nuevoUsuario]);
    navigate("/login");
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
