import { useState, useEffect } from "react";
import BarraAdmin from "../../components/BarraAdmin";
import "../../assets/styles/ProductosAdmin.css";
import { getProducts, setProducts } from "../../utils/products";

const ProductosAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    const datos = getProducts();
    setProductos(datos);
  };

  const guardarProductos = (nuevosProductos) => {
    setProducts(nuevosProductos);
    setProductos(nuevosProductos);
  };

  const eliminarProducto = (id, nombre) => {
    if (window.confirm(`¿Eliminar "${nombre}"?`)) {
      const actualizados = productos.filter((p) => p.id !== id);
      guardarProductos(actualizados);
    }
  };

  const abrirEditar = (producto) => {
    setProductoEditando(producto);
    setMostrarForm(true);
  };

  const abrirNuevo = () => {
    setProductoEditando(null);
    setMostrarForm(true);
  };

  const cerrarForm = () => {
    setMostrarForm(false);
    setProductoEditando(null);
  };

  const guardarProducto = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const producto = {
      id: productoEditando ? productoEditando.id : `PR${Date.now()}`,
      nombre: formData.get("nombre"),
      precio: Number(formData.get("precio")),
      unidad: formData.get("unidad"),
      stock: formData.get("stock"),
      img: productoEditando ? productoEditando.img : "/img/default.jpg",
      desc: formData.get("desc"),
    };

    let nuevosProductos;
    if (productoEditando) {
      nuevosProductos = productos.map((p) =>
        p.id === productoEditando.id ? producto : p
      );
    } else {
      nuevosProductos = [...productos, producto];
    }

    guardarProductos(nuevosProductos);
    cerrarForm();
  };

  const productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.desc.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="pagina-admin">
      <BarraAdmin />

      <main className="contenido-admin">
        <div className="cabecera-productos">
          <div className="titulos">
            <h1>Administrar Productos</h1>
            <p>Gestiona los productos de HuertoHogar</p>
          </div>

          <button className="btn-nuevo" onClick={abrirNuevo}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 5v14m-7-7h14" />
            </svg>
            Nuevo Producto
          </button>
        </div>

        <div className="controles-busqueda">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="campo-busqueda"
          />
          <span className="contador">
            {productosFiltrados.length} productos
          </span>
        </div>

        {mostrarForm && (
          <div className="modal-overlay">
            <div className="modal-producto">
              <h2>{productoEditando ? "Editar Producto" : "Nuevo Producto"}</h2>

              <form onSubmit={guardarProducto} className="form-producto">
                <div className="campo-form">
                  <label>Nombre del producto</label>
                  <input
                    type="text"
                    name="nombre"
                    defaultValue={productoEditando?.nombre}
                    required
                  />
                </div>

                <div className="campo-form">
                  <label>Precio (CLP)</label>
                  <input
                    type="number"
                    name="precio"
                    defaultValue={productoEditando?.precio}
                    required
                  />
                </div>

                <div className="campo-form">
                  <label>Unidad de venta</label>
                  <input
                    type="text"
                    name="unidad"
                    defaultValue={productoEditando?.unidad}
                    placeholder="ej: x kilo, x bolsa"
                    required
                  />
                </div>

                <div className="campo-form">
                  <label>Stock disponible</label>
                  <input
                    type="text"
                    name="stock"
                    defaultValue={productoEditando?.stock}
                    placeholder="ej: 150 kilos, 50 unidades"
                    required
                  />
                </div>

                <div className="campo-form">
                  <label>Descripción</label>
                  <textarea
                    name="desc"
                    defaultValue={productoEditando?.desc}
                    rows="3"
                    required
                  />
                </div>

                <div className="botones-form">
                  <button
                    type="button"
                    onClick={cerrarForm}
                    className="btn-cancelar"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-guardar">
                    {productoEditando ? "Actualizar" : "Crear"} Producto
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid-productos">
          {productosFiltrados.length === 0 ? (
            <div className="sin-productos">
              <p>
                {busqueda
                  ? "No hay productos que coincidan"
                  : "No hay productos registrados"}
              </p>
            </div>
          ) : (
            productosFiltrados.map((producto) => (
              <div key={producto.id} className="tarjeta-producto">
                <div className="imagen-producto">
                  <img src={producto.img} alt={producto.nombre} />
                </div>

                <div className="info-producto">
                  <h3>{producto.nombre}</h3>
                  <p className="descripcion">{producto.desc}</p>

                  <div className="detalles">
                    <span className="precio">
                      ${producto.precio.toLocaleString()} CLP
                    </span>
                    <span className="unidad">{producto.unidad}</span>
                    <span className="stock">{producto.stock}</span>
                  </div>

                  <div className="acciones">
                    <button
                      className="btn-editar"
                      onClick={() => abrirEditar(producto)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() =>
                        eliminarProducto(producto.id, producto.nombre)
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductosAdmin;
