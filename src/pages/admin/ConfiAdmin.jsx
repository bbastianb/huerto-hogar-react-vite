import { useState, useEffect } from "react";
import BarraAdmin from "../../components/BarraAdmin";
import "../../assets/styles/ConfiAdmin.css";
import {
  getUsuarios,
  setUsuarios,
  getUsuarioActual,
  setUsuarioActual,
} from "../../utils/Usuarios";

const ConfiguracionAdmin = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    comuna: "",
    direccion: "",
    contraseña: "",
    confirmarContraseña: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [idAdmin, setIdAdmin] = useState(null);

  useEffect(() => {
    cargarDatosAdministrador();
  }, []);

  const cargarDatosAdministrador = () => {
    const usuarioActual = getUsuarioActual();

    if (usuarioActual && usuarioActual.tipo === "admin") {
      setIdAdmin(usuarioActual.id);
      setDatosFormulario({
        nombre: usuarioActual.nombre || "",
        apellido: usuarioActual.apellido || "",
        email: usuarioActual.email || "",
        telefono: usuarioActual.fono || "",
        comuna: usuarioActual.comuna || "",
        direccion: usuarioActual.direccion || "",
        contraseña: "",
        confirmarContraseña: "",
      });
    } else {
      const usuarios = getUsuarios();
      const administrador = usuarios.find(
        (usuario) => usuario.tipo === "admin"
      );

      if (administrador) {
        setIdAdmin(administrador.id);
        setDatosFormulario({
          nombre: administrador.nombre || "",
          apellido: administrador.apellido || "",
          email: administrador.email || "",
          telefono: administrador.fono || "",
          comuna: administrador.comuna || "",
          direccion: administrador.direccion || "",
          contraseña: "",
          confirmarContraseña: "",
        });
      }
    }
  };

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosFormulario((previo) => ({
      ...previo,
      [name]: value,
    }));
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    setMensaje("");

    if (
      datosFormulario.contraseña &&
      datosFormulario.contraseña !== datosFormulario.confirmarContraseña
    ) {
      setMensaje("Las contraseñas no coinciden");
      return;
    }

    if (datosFormulario.contraseña && datosFormulario.contraseña.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const usuarioActual = getUsuarioActual();
    if (!usuarioActual) {
      setMensaje("Error: No hay usuario en sesión");
      return;
    }

    const usuarios = getUsuarios();
    const usuariosActualizados = usuarios.map((usuario) => {
      if (usuario.id === usuarioActual.id) {
        const usuarioActualizado = {
          ...usuario,
          nombre: datosFormulario.nombre,
          apellido: datosFormulario.apellido,
          email: datosFormulario.email,
          fono: datosFormulario.telefono,
          comuna: datosFormulario.comuna,
          direccion: datosFormulario.direccion,
        };

        if (datosFormulario.contraseña) {
          usuarioActualizado.contrasena = datosFormulario.contraseña;
        }

        return usuarioActualizado;
      }
      return usuario;
    });

    setUsuarios(usuariosActualizados);

    const usuarioActualizadoSesion = usuariosActualizados.find(
      (usuario) => usuario.id === usuarioActual.id
    );
    if (usuarioActualizadoSesion) {
      setUsuarioActual(usuarioActualizadoSesion);
    }

    setMensaje("Perfil actualizado correctamente");

    setDatosFormulario((previo) => ({
      ...previo,
      contraseña: "",
      confirmarContraseña: "",
    }));
    cargarDatosAdministrador();

    setTimeout(() => {
      setMensaje("");
    }, 3000);
  };

  const manejarCancelar = () => {
    cargarDatosAdministrador();
    setMensaje("");
  };

  return (
    <div className="pagina-admin">
      <BarraAdmin />

      <main className="contenido-admin">
        <div className="cabecera-configuracion">
          <h1>Configuración</h1>
          <p>Gestiona tu perfil de administrador</p>
        </div>

        <div className="contenedor-configuracion">
          <form onSubmit={manejarEnvio} className="form-configuracion">
            <div className="campo-form">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={datosFormulario.nombre}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="campo-form">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={datosFormulario.apellido}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="campo-form">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={datosFormulario.email}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="campo-form">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={datosFormulario.telefono}
                onChange={manejarCambio}
                placeholder="+56 9 1234 5678"
              />
            </div>

            <div className="campo-form">
              <label htmlFor="comuna">Comuna</label>
              <input
                type="text"
                id="comuna"
                name="comuna"
                value={datosFormulario.comuna}
                onChange={manejarCambio}
                placeholder="Ej: Santiago, Providencia"
              />
            </div>

            <div className="campo-form">
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={datosFormulario.direccion}
                onChange={manejarCambio}
                placeholder="Calle y número"
              />
            </div>

            <div className="grupo-contraseña">
              <div className="campo-form">
                <label htmlFor="contraseña">Nueva contraseña</label>
                <input
                  type="password"
                  id="contraseña"
                  name="contraseña"
                  value={datosFormulario.contraseña}
                  onChange={manejarCambio}
                  placeholder="Deja en blanco para no cambiar"
                />
              </div>

              <div className="campo-form">
                <label htmlFor="confirmarContraseña">
                  Repetir nueva contraseña
                </label>
                <input
                  type="password"
                  id="confirmarContraseña"
                  name="confirmarContraseña"
                  value={datosFormulario.confirmarContraseña}
                  onChange={manejarCambio}
                  placeholder="Repite la nueva contraseña"
                />
              </div>
            </div>

            <div className="acciones-form">
              <button type="submit" className="btn-guardar">
                Guardar cambios
              </button>

              <button
                type="button"
                onClick={manejarCancelar}
                className="btn-cancelar"
              >
                Cancelar
              </button>
            </div>

            {mensaje && (
              <div
                className={`mensaje ${
                  mensaje.includes("correctamente")
                    ? "mensaje-exito"
                    : "mensaje-error"
                }`}
              >
                {mensaje}
              </div>
            )}
          </form>

          <div className="info-admin">
            <div className="tarjeta-info">
              <div className="avatar-admin">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3>Administrador</h3>
              <p>
                {datosFormulario.nombre} {datosFormulario.apellido}
              </p>
              <p className="email-admin">{datosFormulario.email}</p>
              <div className="badge-admin">Administrador</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfiguracionAdmin;
