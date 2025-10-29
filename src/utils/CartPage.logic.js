// src/utils/CartPage.logic.js
// ===========================================================
// 💡 Lógica pura extraída del componente CartPage.jsx
// ===========================================================
// Cada función se agrupa dentro de window.CartPageLogic
// para evitar colisiones globales y permitir testeo independiente.
// ===========================================================

(function (global) {
    global.CartPageLogic = global.CartPageLogic || {};
  
    /**
     * Aumenta la cantidad de un producto en el carrito.
     * @param {Function} actualizarCantidad - función que actualiza cantidad en el contexto.
     * @param {string|number} productoId - identificador del producto.
     * @returns {boolean} true si se ejecutó correctamente.
     */
    global.CartPageLogic.handleAumentarCantidad = function (actualizarCantidad, productoId) {
      if (typeof actualizarCantidad !== 'function' || !productoId) return false;
      actualizarCantidad(productoId, 1);
      return true;
    };
  
    /**
     * Disminuye la cantidad o elimina el producto si llega a 1.
     * @param {Array} carrito - lista actual de productos.
     * @param {Function} actualizarCantidad - función para actualizar cantidad.
     * @param {Function} eliminarProducto - función para eliminar producto.
     * @param {string|number} productoId - id del producto a disminuir.
     * @returns {boolean} true si se ejecutó una acción válida.
     */
    global.CartPageLogic.handleDisminuirCantidad = function (carrito, actualizarCantidad, eliminarProducto, productoId) {
      if (!Array.isArray(carrito) || typeof actualizarCantidad !== 'function' || typeof eliminarProducto !== 'function' || !productoId) {
        return false;
      }
  
      const producto = carrito.find((item) => item.id === productoId);
      if (!producto) return false;
  
      if (producto.cantidad > 1) {
        actualizarCantidad(productoId, -1);
      } else {
        eliminarProducto(productoId);
      }
  
      return true;
    };
  
    /**
     * Elimina un producto con confirmación del usuario.
     * @param {Function} eliminarProducto - función para eliminar producto del carrito.
     * @param {string|number} productoId - id del producto.
     * @param {Function} confirmFn - función de confirmación (por defecto window.confirm).
     * @returns {boolean} true si el usuario confirma y se elimina.
     */
    global.CartPageLogic.handleEliminarProducto = function (eliminarProducto, productoId, confirmFn) {
      if (typeof eliminarProducto !== 'function' || !productoId) return false;
  
      const confirmar = confirmFn ? confirmFn('¿Estás seguro de que quieres eliminar este producto del carrito?') : window.confirm('¿Estás seguro de que quieres eliminar este producto del carrito?');
  
      if (confirmar) {
        eliminarProducto(productoId);
        return true;
      }
      return false;
    };
  
    /**
     * Valida el carrito antes del checkout y realiza navegación.
     * @param {Array} carrito - lista actual de productos.
     * @param {Function} navigate - función de navegación (por ejemplo useNavigate()).
     * @param {Function} alertFn - función para alertar (por defecto window.alert).
     * @returns {boolean} true si procede a checkout, false si carrito vacío.
     */
    global.CartPageLogic.handleCheckout = function (carrito, navigate, alertFn) {
      if (!Array.isArray(carrito) || typeof navigate !== 'function') return false;
  
      if (carrito.length === 0) {
        const alertMethod = alertFn || window.alert;
        alertMethod('Tu carrito está vacío. Agrega productos antes de proceder al pago.');
        return false;
      }
  
      navigate('/checkout');
      return true;
    };
  
  })(typeof window !== 'undefined' ? window : global);
  