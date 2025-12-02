import { useEffect, useState } from "react";
import BarraAdmin from "../../components/BarraAdmin.jsx";
import "../../assets/styles/ContactosAdmin.css";
import { getContactos, deleteContacto } from "../../services/ContactoService.js";

export default function ContactosAdmin() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const cargarContactos = async () => {
    try {
      setCargando(true);
      setError("");
      const data = await getContactos();
      setContactos(data || []);
    } catch (err) {
      console.error(err);
      setError("Error al cargar los mensajes de contacto.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarContactos();
  }, []);

  const handleDelete = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar este mensaje?"
    );
    if (!confirmar) return;

    try {
      await deleteContacto(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el mensaje.");
    }
  };

  return (
    <div className="admin-layout">
      <BarraAdmin />
      <main className="admin-main">
        <div className="contactos-admin">
          <div className="contactos-header">
            <h1>Mensajes de contacto</h1>
            <button className="contactos-recargar" onClick={cargarContactos}>
              Recargar
            </button>
          </div>

          {cargando && <p>Cargando mensajes...</p>}
          {error && <p className="contactos-error">{error}</p>}

          {!cargando && !error && contactos.length === 0 && (
            <p>No hay mensajes de contacto aún.</p>
          )}

          {!cargando && !error && contactos.length > 0 && (
            <div className="contactos-table-wrapper">
              <table className="contactos-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Asunto</th>
                    <th>Mensaje</th>
                    <th>Fecha envío</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {contactos.map((c) => (
                    <tr key={c.id}>
                      <td>{c.nombre}</td>
                      <td>{c.email}</td>
                      <td>{c.telefono || "-"}</td>
                      <td>{c.asunto || "-"}</td>
                      <td className="contactos-mensaje">
                        {c.mensaje?.length > 80
                          ? c.mensaje.slice(0, 80) + "..."
                          : c.mensaje}
                      </td>
                      <td>
                        {c.fechaEnvio
                          ? new Date(c.fechaEnvio).toLocaleString()
                          : "-"}
                      </td>
                      <td>
                        <button
                          className="btn-eliminar-contacto"
                          onClick={() => handleDelete(c.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
