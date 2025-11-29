import { useState, useEffect } from "react";
import BarraAdmin from "../../components/BarraAdmin.jsx";
import "../../assets/styles/OrdenesAdmin.css";
import {
  listarOrdenes,
  actualizarEstadoOrden,
  eliminarOrden,
} from "../../services/OrdenService.js";

const ESTADOS = [
  "Pendiente",
  "Preparando",
  "Enviado",
  "Entregado",
  "Cancelado",
];

const formatearCLP = (monto) => {
  if (monto == null || isNaN(monto)) return "Sin total";
  return Number(monto).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });
};

function EstadoDropdown({
  value,
  onChange,
  opciones,
  placeholder = "Seleccionar",
  className = "",
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (nuevo) => {
    onChange(nuevo);
    setOpen(false);
  };

  const label = value || placeholder || "Seleccionar";

  return (
    <div
      className={`custom-select ${className}`}
      tabIndex={0}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        className="custom-select-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{label}</span>
        <span className="custom-select-arrow">▾</span>
      </button>

      {open && (
        <ul className="custom-select-menu">
          {placeholder && (
            <li
              className={`custom-select-option ${
                value === "" ? "is-active" : ""
              }`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect("")}
            >
              {placeholder}
            </li>
          )}

          {opciones.map((op) => (
            <li
              key={op}
              className={`custom-select-option ${
                value === op ? "is-active" : ""
              }`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(op)}
            >
              {op}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function OrdenesAdmin() {
  const [ordenes, setOrdenes] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [cargando, setCargando] = useState(false);

  const cargarOrdenes = async () => {
    try {
      setCargando(true);
      const data = await listarOrdenes();
      setOrdenes(data || []);
    } catch (error) {
      console.error("Error al listar órdenes:", error);
      alert("No se pudieron cargar las órdenes.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarOrdenes();
  }, []);

  const ordenesFiltradas = ordenes.filter((orden) => {
    const texto = filtroTexto.toLowerCase();

    const idOrden = String(orden.id_orden || "").toLowerCase();
    const estadoActual = (orden.estado_orden || "").toLowerCase();
    const clienteNombre = (
      (orden.usuario?.nombre || "") +
      " " +
      (orden.usuario?.apellido || "")
    ).toLowerCase();
    const clienteEmail = (orden.usuario?.email || "").toLowerCase();

    const pasaTexto =
      !texto ||
      idOrden.includes(texto) ||
      estadoActual.includes(texto) ||
      clienteNombre.includes(texto) ||
      clienteEmail.includes(texto);

    const pasaEstado = !filtroEstado || orden.estado_orden === filtroEstado;

    return pasaTexto && pasaEstado;
  });

  const handleCambiarEstado = async (idOrden, nuevoEstado) => {
    try {
      setOrdenes((prev) =>
        prev.map((o) =>
          o.id_orden === idOrden ? { ...o, estado_orden: nuevoEstado } : o
        )
      );

      await actualizarEstadoOrden(idOrden, nuevoEstado);
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      alert("No se pudo actualizar el estado de la orden.");
    }
  };

  const handleEliminarOrden = async (idOrden) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta orden?")) return;

    try {
      await eliminarOrden(idOrden);
      setOrdenes((prev) => prev.filter((o) => o.id_orden !== idOrden));
    } catch (error) {
      console.error("Error al eliminar orden:", error);
      alert("No se pudo eliminar la orden.");
    }
  };

  return (
    <div className="admin-layout">
      <BarraAdmin />
      <main className="admin-main">
        <div className="orders-admin">
          <div className="orders-search-bar">
            <input
              type="text"
              placeholder="Buscar por ID, cliente, correo o estado..."
              className="orders-input"
              value={filtroTexto}
              onChange={(e) => setFiltroTexto(e.target.value)}
            />

            <EstadoDropdown
              value={filtroEstado}
              onChange={setFiltroEstado}
              opciones={ESTADOS}
              placeholder="Todos los estados"
              className="orders-select-filter"
            />
          </div>

          <section className="orders-list">
            {cargando ? (
              <div className="orders-empty">
                <p>Cargando órdenes...</p>
              </div>
            ) : ordenesFiltradas.length === 0 ? (
              <div className="orders-empty">
                <p>No se encontraron órdenes con ese criterio.</p>
              </div>
            ) : (
              <div className="orders-grid">
                {ordenesFiltradas.map((orden) => {
                  const id = orden.id_orden;
                  const cliente = orden.usuario || {};
                  const fecha = orden.fecha_orden;
                  const estadoActual = orden.estado_orden || "Pendiente";
                  const totalOrden = orden.total;

                  return (
                    <div key={id} className="order-card">
                      <div className="order-header">
                        <div className="order-icon">
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
                              d="M3.75 4.5h16.5v4.75a2.25 2.25 0 1 0 0 4.5v4.75H3.75v-4.75a2.25 2.25 0 1 0 0-4.5V4.5Z"
                            />
                          </svg>
                        </div>

                        <div className="order-main-info">
                          <h3 className="order-id">Orden #{id}</h3>
                          <p className="order-client">
                            {cliente.nombre} {cliente.apellido} -{" "}
                            {cliente.email}
                          </p>
                          <span className="order-date">
                            {fecha
                              ? new Date(fecha).toLocaleDateString()
                              : "Sin fecha"}
                          </span>
                        </div>
                      </div>

                      <div className="order-details">
                        <div className="order-detail-item">
                          <span className="order-detail-icon">
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
                                d="M12 6v6l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </span>
                          <div className="order-detail-content">
                            <strong>Estado:</strong>

                            <EstadoDropdown
                              value={estadoActual}
                              onChange={(nuevo) =>
                                handleCambiarEstado(id, nuevo)
                              }
                              opciones={ESTADOS}
                              placeholder={null}
                              className="order-status-dropdown"
                            />
                          </div>
                        </div>

                        <div className="order-detail-item">
                          <span className="order-detail-icon">
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
                                d="M12 8c-1.657 0-3 .843-3 1.875S10.343 11.75 12 11.75s3 .843 3 1.875S13.657 15.5 12 15.5m0-7.5c1.03 0 1.942.267 2.597.713M12 8V6.75m0 8.75V17.25m0 1.5v-1.5m0-8.75v-1.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </span>
                          <div className="order-detail-content">
                            <strong>Total:</strong>
                            <span className="order-total">
                              {formatearCLP(totalOrden)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="order-actions">
                        <button
                          className="order-delete-btn"
                          onClick={() => handleEliminarOrden(id)}
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
                          Eliminar orden
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
