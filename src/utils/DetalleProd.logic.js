// src/utils/DetalleProd.logic.js
// =========================================================
// 🧠 Lógica pura para el componente DetalleProd
// Todas las funciones se definen dentro de window.DetalleProdLogic
// para poder ser reutilizadas y testeadas fácilmente con Jasmine.
// =========================================================

window.DetalleProdLogic = window.DetalleProdLogic || {};

/**
 * 🛒 handleAddToCart
 * Agrega el producto seleccionado al carrito según la cantidad elegida.
 * También gestiona el estado visual temporal "addedToCart".
 *
 * @param {Object} product - Producto actual.
 * @param {number} quantity - Cantidad a agregar.
 * @param {Function} agregarAlCarrito - Función del contexto para agregar al carrito.
 * @param {Function} setAddedToCart - Actualizador del estado visual.
 */
window.DetalleProdLogic.handleAddToCart = function(product, quantity, agregarAlCarrito, setAddedToCart) {
    try {
        if (!product || typeof agregarAlCarrito !== 'function') {
            console.error('❌ handleAddToCart: parámetros inválidos');
            return;
        }
        const cantidad = Number(quantity) > 0 ? Number(quantity) : 1;

        for (let i = 0; i < cantidad; i++) {
            agregarAlCarrito(product);
        }

        // Simular animación de agregado
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 1200);
    } catch (error) {
        console.error('❌ Error en handleAddToCart:', error);
    }
};

/**
 * 🔢 handleQuantityChange
 * Actualiza la cantidad seleccionada, garantizando que siempre sea un número válido ≥ 1.
 *
 * @param {Event} e - Evento del input.
 * @param {Function} setQuantity - Setter de estado de cantidad.
 */
window.DetalleProdLogic.handleQuantityChange = function(e, setQuantity) {
    try {
        const value = parseInt(e?.target?.value);
        setQuantity(isNaN(value) || value < 1 ? 1 : value);
    } catch (error) {
        console.error('❌ Error en handleQuantityChange:', error);
        setQuantity(1);
    }
};
