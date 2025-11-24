import { useState, useEffect } from "react";
import BarraAdmin from "../../components/BarraAdmin.jsx";
import "../../assets/styles/UsuariosAdmin.css";
import { getUsuarios, eliminarUsuario } from "../../services/UsuarioService.js";

export default function UsuariosAdmin() {
  const [usuarios, setUsuariosState] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const cargarUsuarios = async () => {
      const usuariosData = await getUsuarios();
      setUsuariosState(usuariosData);
    };
    cargarUsuarios();
  }, []);

  const clientesFiltrados = usuarios.filter((usuario) => {
    if (usuario.tipo === "admin") return false;

    const coincideBusqueda =
      usuario.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      usuario.apellido.toLowerCase().includes(filtro.toLowerCase()) ||
      usuario.email.toLowerCase().includes(filtro.toLowerCase()) ||
      usuario.comuna.toLowerCase().includes(filtro.toLowerCase());
    return coincideBusqueda;
  });

  const eliminarCliente = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
      try {
        await eliminarUsuario(id);
        const usuariosActualizados = usuarios.filter(
          (usuario) => usuario.id !== id
        );
        setUsuariosState(usuariosActualizados);
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
        alert("No se pudo eliminar el cliente. Intenta nuevamente.");
      }
    }
  };

  return (
    <div className="admin-layout">
      <BarraAdmin />
      <main className="admin-main">
        <div className="home-admin">
          <div className="barra-busqueda-clientes">
            <input
              type="text"
              placeholder="Buscar clientes por nombre, email o comuna..."
              className="input-busqueda-clientes"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>

          <section className="lista-clientes">
            {clientesFiltrados.length === 0 ? (
              <div className="sin-clientes">
                <p>
                  {filtro
                    ? "No se encontraron clientes con ese criterio"
                    : "No hay clientes registrados"}
                </p>
              </div>
            ) : (
              <div className="grid-clientes">
                {clientesFiltrados.map((cliente) => (
                  <div key={cliente.id} className="tarjeta-cliente">
                    <div className="cliente-header">
                      <div className="cliente-avatar">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                          />
                        </svg>
                      </div>
                      <div className="cliente-info">
                        <h3 className="cliente-nombre">
                          {cliente.nombre} {cliente.apellido}
                        </h3>
                        <p className="cliente-email">{cliente.email}</p>
                        <span className="cliente-tipo">Cliente</span>
                      </div>
                    </div>

                    <div className="cliente-detalles">
                      <div className="detalle-item">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                          />
                        </svg>
                        <span>{cliente.fono}</span>
                      </div>

                      <div className="detalle-item">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                        <span>{cliente.comuna}</span>
                      </div>

                      <div className="detalle-item">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1.096"
                          />
                        </svg>
                        <span>{cliente.direccion}</span>
                      </div>
                    </div>

                    <div className="cliente-acciones">
                      <button
                        className="btn-eliminar-cliente"
                        onClick={() => eliminarCliente(cliente.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
