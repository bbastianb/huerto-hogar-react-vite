import { useState, useEffect } from "react";
import BarraAdmin from "../../components/BarraAdmin";
import "../../assets/styles/ProductosAdmin.css";
import {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto as eliminarProductoApi,
} from "../../services/ProductoService.js";
// ✅ Importa la imagen por defecto
import imagenDefault from "../../assets/img/default.jpg";
import { getImageForProduct } from "../../utils/products";

const ProductosAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [notificacion, setNotificacion] = useState('');
  const [imagenPreview, setImagenPreview] = useState(imagenDefault);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const datos = await getProductos();
      setProductos(datos);
    } catch (error) {
      console.error("Error cargando productos desde API:", error);
    }
  };


  const guardarProducto = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const categoria = formData.get("categoria");
    const esEdicion = Boolean(productoEditando);

    const id =
      esEdicion && productoEditando?.id
        ? productoEditando.id
        : generarId(categoria);

    const productoPayload = {
      id,
      nombre: formData.get("nombre"),
      precio: Number(formData.get("precio")),
      unidad: formData.get("unidad"),
      stock: formData.get("stock"),
      img: formData.get("img") || "", // opcional
      // 👇 OJO: al backend le mandamos "descripcion", no "desc"
      descripcion: formData.get("desc"),
    };

    try {
      let productoGuardado;

      if (esEdicion) {
        // PUT /api/productos/{id}
        productoGuardado = await actualizarProducto(id, productoPayload);
        setProductos((prev) =>
          prev.map((p) => (p.id === id ? productoGuardado : p))
        );
        mostrarNotificacion("Producto actualizado");
      } else {
        // POST /api/productos
        productoGuardado = await crearProducto(productoPayload);
        setProductos((prev) => [...prev, productoGuardado]);
        mostrarNotificacion("Producto creado");
      }

      cerrarForm();
    } catch (error) {
      console.error("Error guardando producto:", error);
      mostrarNotificacion("Error al guardar el producto");
    }
  };


  const eliminarProducto = async (id, nombre) => {
    if (!window.confirm(`¿Eliminar "${nombre}"?`)) return;

    try {
      await eliminarProductoApi(id); // DELETE al backend
      const actualizados = productos.filter((p) => p.id !== id);
      setProductos(actualizados);
      mostrarNotificacion(`Producto "${nombre}" eliminado correctamente`);
    } catch (error) {
      console.error("Error eliminando producto:", error);
      mostrarNotificacion("Error al eliminar el producto");
    }
  };


  const abrirEditar = (producto) => {
    setProductoEditando(producto);

    const cleanedImg = (producto.img || "").trim();
    const customImg = cleanedImg !== "" ? cleanedImg : null;

    const imagen =
      getImageForProduct(producto) ||  // si es FR001, VR001, etc.
      customImg ||                     // si el admin guardó una URL
      imagenDefault;                   // si no hay nada

    setImagenPreview(imagen);
    setMostrarForm(true);
  };



  const abrirNuevo = () => {
    setProductoEditando(null);
    setImagenPreview(imagenDefault);
    setMostrarForm(true);
  };

  const cerrarForm = () => {
    setMostrarForm(false);
    setProductoEditando(null);
    setImagenPreview(imagenDefault);
  };

  const mostrarNotificacion = (mensaje) => {
    setNotificacion(mensaje);
    setTimeout(() => setNotificacion(''), 3000);
  };

  const generarId = (categoria) => {
    const categorias = {
      frutas: "FR",
      verduras: "VR",
      otros: "PO"
    };

    const prefijo = categorias[categoria] || "PR";
    const productosCategoria = productos.filter(p => p.id.startsWith(prefijo));
    const numero = (productosCategoria.length + 1).toString().padStart(3, '0');
    return `${prefijo}${numero}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Actualizar vista previa si cambia la imagen
    if (name === "img") {
      setImagenPreview(value || imagenDefault);
    }
  };

  const productosFiltrados = productos.filter((producto) => {
    const termino = busqueda.toLowerCase();
    const nombre = (producto.nombre || "").toLowerCase();
    const descripcion = (producto.descripcion || "").toLowerCase();

    return nombre.includes(termino) || descripcion.includes(termino);
  });


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

        {notificacion && (
          <div className="notificacion">
            {notificacion}
          </div>
        )}

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
                    defaultValue={productoEditando?.nombre || ""}
                    required
                  />
                </div>

                <div className="campo-form">
                  <label>Categoría</label>
                  <select
                    name="categoria"
                    defaultValue={productoEditando ? getCategory(productoEditando) : "frutas"}
                    required
                  >
                    <option value="frutas">Frutas</option>
                    <option value="verduras">Verduras</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>

                <div className="campo-form">
                  <label>Imagen del producto</label>
                  <input
                    type="text"
                    name="img"
                    defaultValue={productoEditando?.img || ""}
                    onChange={handleInputChange}
                    placeholder="Dejar vacío para usar imagen por defecto"
                  />
                  <small>
                    Si dejas vacío, se usará la imagen por defecto automáticamente
                  </small>

                  {/* Vista previa de la imagen */}
                  <div className="vista-previa">
                    <img
                      src={imagenPreview}
                      alt="Vista previa"
                      onError={(e) => {
                        // Si falla la imagen, usar la por defecto
                        e.target.src = imagenDefault;
                      }}
                    />
                    <small>Vista previa</small>
                  </div>
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
                    defaultValue={productoEditando?.descripcion}
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
                  {(() => {
                    const cleanedImg = (producto.img || "").trim();
                    const customImg = cleanedImg !== "" ? cleanedImg : null;

                    const imageSrc =
                      getImageForProduct(producto) || // FR001, VR001, etc.
                      customImg ||                    // URL guardada por admin
                      imagenDefault;

                    return (
                      <img
                        src={imageSrc}
                        alt={producto.nombre}
                        onError={(e) => {
                          e.target.src = imagenDefault;
                        }}
                      />
                    );
                  })()}
                </div>

                <div className="info-producto">
                  <h3>{producto.nombre}</h3>
                  <p className="descripcion">{producto.descripcion}</p>

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

// Función auxiliar para obtener categoría (agrégala si no existe)
const getCategory = (product) => {
  if (!product || !product.id) return 'otros';
  const pref = String(product.id).slice(0, 2).toUpperCase();
  if (pref === "FR") return "frutas";
  if (pref === "VR") return "verduras";
  return "otros";
};

export default ProductosAdmin;