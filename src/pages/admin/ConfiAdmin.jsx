import { useState, useEffect } from "react";
import BarraAdmin from "../../components/BarraAdmin";
import "../../assets/styles/ConfiAdmin.css";
import { getUsuarios, actualizarUsuario } from "../../services/UsuarioService";

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
    region: "",
    rol: "admin",
  });
  const [mensaje, setMensaje] = useState("");
  const [idAdmin, setIdAdmin] = useState(null);

  useEffect(() => {
    cargarDatosAdministrador();
  }, []);

  const cargarDatosAdministrador = async () => {
    try {
      const usuarioStorage = JSON.parse(localStorage.getItem("usuarioActual"));

      const usuarios = await getUsuarios();

      let admin = null;

      if (usuarioStorage) {
        admin =
          usuarios.find((u) => u.id === usuarioStorage.id) ||
          usuarios.find(
            (u) => u.email.toLowerCase() === usuarioStorage.email.toLowerCase()
          );
      }

      if (!admin) {
        setMensaje("No se encontró el administrador.");
        return;
      }

      setIdAdmin(admin.id);
      setDatosFormulario({
        nombre: admin.nombre || "",
        apellido: admin.apellido || "",
        email: admin.email || "",
        telefono: admin.telefono || "",
        comuna: admin.comuna || "",
        direccion: admin.direccion || "",
        contraseña: "",
        confirmarContraseña: "",
        region: admin.region || "",
        rol: admin.rol || "admin",
      });
    } catch (err) {
      console.error("Error al cargar datos de administrador:", err);
      setMensaje("Error al cargar datos de administrador");
    }
  };

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosFormulario((previo) => ({
      ...previo,
      [name]: value,
    }));
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setMensaje("");

    if (
      datosFormulario.contraseña &&
      datosFormulario.contraseña !== datosFormulario.confirmarContraseña
    ) {
      setMensaje("Las contraseñas no coinciden");
      return;
    }

    if (datosFormulario.contraseña && datosFormulario.contraseña.length < 8) {
      setMensaje("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (!idAdmin) {
      setMensaje("No se pudo identificar al administrador.");
      return;
    }

    const payload = {
      nombre: datosFormulario.nombre,
      apellido: datosFormulario.apellido,
      email: datosFormulario.email,
      telefono: datosFormulario.telefono,
      comuna: datosFormulario.comuna,
      direccion: datosFormulario.direccion,
      region: datosFormulario.region,
      rol: datosFormulario.rol,
    };

    if (datosFormulario.contraseña) {
      payload.contrasenna = datosFormulario.contraseña;
    }

    try {
      const adminActualizado = await actualizarUsuario(idAdmin, payload);
      const usuarioActualStorage = {
        id: adminActualizado.id,
        nombre: adminActualizado.nombre,
        apellido: adminActualizado.apellido,
        email: adminActualizado.email,
        rol: adminActualizado.rol,
      };

      localStorage.setItem(
        "usuarioActual",
        JSON.stringify(usuarioActualStorage)
      );

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
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      let msg = "Error al actualizar el perfil.";
      if (err.response && err.response.data) {
        msg = err.response.data.message || err.response.data;
      }
      setMensaje("msg");
    }
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
