// src/utils/ProductCard.logic.js
// Namespace global seguro para evitar redeclaraciones en Karma/Jasmine o recargas.
(function (global) {
  if (!global.ProductCardLogic) {
    global.ProductCardLogic = {};
  }
  var ns = global.ProductCardLogic;

  /**
   * safeAddToCart(e, agregarAlCarrito, product)
   * Maneja el click del botón "Añadir al carrito":
   * - Llama preventDefault/stopPropagation si existe el evento.
   * - Valida que agregarAlCarrito sea función y product no sea nulo.
   * - Devuelve true si se agregó; false en caso contrario.
   *
   * @param {Event|null} e
   * @param {Function} agregarAlCarrito
   * @param {Object} product
   * @returns {boolean}
   */
  ns.safeAddToCart = function safeAddToCart(e, agregarAlCarrito, product) {
    try {
      if (e && typeof e.preventDefault === "function") e.preventDefault();
      if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    } catch (_) {
      // Ignoramos errores del event
    }

    if (typeof agregarAlCarrito !== "function") return false;
    if (product == null) return false;

    try {
      agregarAlCarrito(product);
      return true;
    } catch (_) {
      return false;
    }
  };

  /**
   * onImageError(e, fallbackUrl)
   * Handler seguro para onError de <img>:
   * - Si hay e.target.src y fallbackUrl, reemplaza la imagen rota por el fallback.
   * - Si no se pasa fallbackUrl, usa un placeholder por defecto.
   * - Devuelve la URL finalmente aplicada o null si no se pudo aplicar.
   *
   * @param {Event|null} e
   * @param {string} [fallbackUrl]
   * @returns {string|null}
   */
  ns.onImageError = function onImageError(e, fallbackUrl) {
    var safeFallback =
      typeof fallbackUrl === "string" && fallbackUrl.trim().length > 0
        ? fallbackUrl.trim()
        : "https://via.placeholder.com/300x200?text=Imagen+no+disponible";

    if (!e || !e.target) return null;

    try {
      e.target.src = safeFallback;
      return safeFallback;
    } catch (_) {
      return null;
    }
  };

  /**
   * getProductDetailPath(product)
   * Construye la ruta del detalle del producto. Devuelve null si no hay id válido.
   *
   * @param {Object} product
   * @returns {string|null}
   */
  ns.getProductDetailPath = function getProductDetailPath(product) {
    if (!product || product.id == null) return null;
    var id = String(product.id).trim();
    if (!id) return null;
    return "/detalle/" + id;
  };
})(window);
