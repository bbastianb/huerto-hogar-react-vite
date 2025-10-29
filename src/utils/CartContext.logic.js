// src/utils/CartContext.logic.js
// ===========================================================
// 💡 Lógica pura extraída del componente CartContext.jsx
// ===========================================================
// Todas las funciones están agrupadas bajo window.CartContextLogic
// para evitar colisiones globales.
// Cada función incluye comentarios explicativos sobre su propósito.
// ===========================================================

window.CartContextLogic = window.CartContextLogic || {};


/**
 * Carga inicial del carrito desde localStorage.
 * Devuelve un array válido de productos o [] en caso de error o datos corruptos.
 */
window.CartContextLogic.cargarCarritoInicial = function () {
    try {
        const savedCart = localStorage.getItem('carrito');
        if (savedCart) {
            const parsed = JSON.parse(savedCart);
            return Array.isArray(parsed) ? parsed : [];
        }
    } catch (error) {
        console.error('❌ Error cargando carrito inicial:', error);
    }
    return [];
};

/**
 * Guarda el carrito actual en localStorage.
 * Asegura persistencia entre sesiones.
 */
window.CartContextLogic.guardarCarrito = function (carrito) {
    try {
        localStorage.setItem('carrito', JSON.stringify(carrito || []));
        return true;
    } catch (error) {
        console.error('❌ Error guardando carrito:', error);
        return false;
    }
};

/**
 * Agrega un producto al carrito.
 * Si ya existe, aumenta la cantidad. Si no, lo añade nuevo.
 */
window.CartContextLogic.agregarAlCarrito = function (carritoAnterior, producto) {
    if (!producto || typeof producto !== 'object' || !producto.id) return carritoAnterior || [];

    const carritoActual = Array.isArray(carritoAnterior) ? carritoAnterior : [];
    const productoExistenteIndex = carritoActual.findIndex(item => item.id === producto.id);
    let nuevoCarrito;

    if (productoExistenteIndex >= 0) {
        nuevoCarrito = [...carritoActual];
        nuevoCarrito[productoExistenteIndex] = {
            ...nuevoCarrito[productoExistenteIndex],
            cantidad: nuevoCarrito[productoExistenteIndex].cantidad + 1
        };
    } else {
        nuevoCarrito = [
            ...carritoActual,
            {
                id: producto.id,
                nombre: producto.nombre || 'Sin nombre',
                precio: producto.precio || 0,
                img: producto.img || '',
                cantidad: 1
            }
        ];
    }

    return nuevoCarrito;
};

/**
 * Actualiza la cantidad de un producto en el carrito.
 * Si la cantidad llega a 0, el producto se elimina.
 */
window.CartContextLogic.actualizarCantidad = function (carritoAnterior, productoId, cantidad) {
    if (!Array.isArray(carritoAnterior) || !productoId || typeof cantidad !== 'number') return carritoAnterior || [];

    const nuevoCarrito = carritoAnterior
        .map((producto) =>
            producto.id === productoId
                ? { ...producto, cantidad: Math.max(0, producto.cantidad + cantidad) }
                : producto
        )
        .filter(producto => producto.cantidad > 0);

    return nuevoCarrito;
};

/**
 * Elimina un producto específico del carrito.
 */
window.CartContextLogic.eliminarProducto = function (carritoAnterior, productoId) {
    if (!Array.isArray(carritoAnterior) || !productoId) return carritoAnterior || [];
    return carritoAnterior.filter(producto => producto.id !== productoId);
};

/**
 * Limpia completamente el carrito.
 */
window.CartContextLogic.limpiarCarrito = function () {
    return [];
};

/**
 * Calcula el total de productos (sumatoria de cantidades).
 */
window.CartContextLogic.calcularTotalProductos = function (carrito) {
    if (!Array.isArray(carrito)) return 0;
    return carrito.reduce((total, item) => total + (item.cantidad || 0), 0);
};
