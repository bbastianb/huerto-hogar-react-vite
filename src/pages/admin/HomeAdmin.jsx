import { useEffect, useState } from "react";
import { getUsuarios } from "../../services/UsuarioService.js";
import { getProductos } from "../../services/ProductoService.js";
import TarjetaEstadistica from "../../components/TarjetaEstadistica.jsx";
import BarraAdmin from "../../components/BarraAdmin.jsx";
import "../../assets/styles/HomeAdmin.css";
import { Link } from "react-router-dom";

export default function HomeAdmin() {
  const [estadisticas, setEstadisticas] = useState({
    totalUsuarios: 0,
    usuariosRecientes: [],
    totalProductos: 0,
  });

  const [usuarioActual, setUsuarioActual] = useState(null);

  const userIcono = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      width="24"
      height="24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
      />
    </svg>
  );

  const productIcono = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      width="24"
      height="24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 7.5V6a2 2 0 0 0-2-2h-3m5 3.5-9 4.5m9-4.5-9-4.5M3 7.5V6a2 2 0 0 1 2-2h3m-5 3.5 9 4.5m-9-4.5 9-4.5m0 0V3m0 4.5V21m0-13.5 9 4.5M12 21l-9-4.5V7.5m9 13.5 9-4.5V7.5"
      />
    </svg>
  );

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Los productos siguen desde los js Falta completar
        const products = await getProductos();
        const totalProductos = products.length;

        const usuarios = await getUsuarios();
        const totalUsuarios = usuarios.length;
        const usuariosRecientes = usuarios.slice(-5).reverse();

        const usuarioStorage = JSON.parse(
          localStorage.getItem("usuarioActual")
        );
        setUsuarioActual(usuarioStorage || null);

        setEstadisticas({
          totalUsuarios,
          usuariosRecientes,
          totalProductos,
        });
      } catch (error) {
        console.error("Error al cargar datos de estadísticas:", error);
      }
    };
    cargarDatos();
  }, []);

  return (
    <div className="admin-layout">
      <BarraAdmin />
      <main className="admin-main">
        <div className="home-admin">
          <header className="header-admin">
            <h1 className="titulo-admin">
              ¡Hola {usuarioActual?.nombre || "Administrador"}!
            </h1>
            <p className="subtitulo-admin">
              Bienvenido al centro de control de Huerto Hogar
            </p>
          </header>

          <section className="seccion-estadisticas">
            <h2>Estadísticas Generales</h2>
            <div className="grid-estadisticas">
              <Link to="/admin/usuarios">
                <TarjetaEstadistica
                  titulo="Total de Usuarios"
                  valor={estadisticas.totalUsuarios}
                  icono={userIcono}
                  color="verde"
                />
              </Link>
              <Link to="/admin/productos">
                <TarjetaEstadistica
                  titulo="Total de Productos"
                  valor={estadisticas.totalProductos}
                  icono={productIcono}
                  color="verde"
                />
              </Link>
            </div>
          </section>

          <section className="seccion-usuarios">
            <h2>Usuarios Recientes</h2>
            <div className="lista-usuarios">
              {estadisticas.usuariosRecientes.map((usuario) => (
                <div key={usuario.id} className="tarjeta-usuario">
                  <div className="info-usuario">
                    <h4>
                      {usuario.nombre} {usuario.apellido}
                    </h4>
                    <p>{usuario.email}</p>
                    <span className={`badge-tipo ${usuario.tipo}`}>
                      {usuario.tipo}
                    </span>
                  </div>
                  <div className="detalles-usuario">
                    <small>Tel: {usuario.fono || usuario.telefono}</small>
                    <small>{usuario.comuna}</small>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
