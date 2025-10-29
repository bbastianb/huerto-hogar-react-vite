// src/utils/UseCart.logic.js
// Namespace global seguro para evitar redeclaraciones.
(function (global) {
  if (!global.UseCartLogic) {
    global.UseCartLogic = {};
  }
  var ns = global.UseCartLogic;

  /**
   * loadSavedCart(storage)
   * Lee el carrito desde storage bajo la clave 'carrito'.
   * Devuelve [] si no existe, si el JSON es inválido o si no es un arreglo.
   * @param {{getItem:Function}=} storage  - e.g., window.localStorage
   * @returns {Array}
   */
  ns.loadSavedCart = function loadSavedCart(storage) {
    try {
      if (!storage || typeof storage.getItem !== "function") return [];
      var raw = storage.getItem("carrito");
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  };

  /**
   * normalizeToCartItem(product, quantity)
   * Convierte un producto de tu dominio al shape del carrito usado en este hook.
   * @param {Object} product - { id, nombre, precio }
   * @param {number} quantity
   * @returns {Object|null} { id, title, price, quantity } o null si entrada inválida
   */
  ns.normalizeToCartItem = function normalizeToCartItem(product, quantity) {
    if (!product || product.nombre == null || product.precio == null || product.id == null) return null;
    var q = Number(quantity);
    if (!isFinite(q) || q <= 0) q = 1;
    return {
      id: product.id,
      title: String(product.nombre),
      price: Number(product.precio),
      quantity: q
    };
  };

  /**
   * addItem(prevCart, product, quantity)
   * Devuelve un NUEVO carrito con el item agregado o aumentado por 'title' (nombre).
   * No persiste. No muta prevCart.
   * @param {Array} prevCart
   * @param {Object} product
   * @param {number} quantity
   * @returns {Array} nuevo carrito
   */
  ns.addItem = function addItem(prevCart, product, quantity) {
    var base = Array.isArray(prevCart) ? prevCart.slice() : [];
    var item = ns.normalizeToCartItem(product, quantity);
    if (!item) return base;

    var out = [];
    var found = false;
    for (var i = 0; i < base.length; i++) {
      var it = base[i];
      if (it && it.title === item.title) {
        found = true;
        out.push({
          id: it.id,
          title: it.title,
          price: Number(it.price),
          quantity: Number(it.quantity) + item.quantity
        });
      } else {
        out.push(it);
      }
    }
    if (!found) out.push(item);
    return out;
  };

  /**
   * removeItem(prevCart, productTitle)
   * Devuelve un NUEVO carrito sin el item cuyo title coincide.
   * @param {Array} prevCart
   * @param {string} productTitle
   * @returns {Array}
   */
  ns.removeItem = function removeItem(prevCart, productTitle) {
    var base = Array.isArray(prevCart) ? prevCart : [];
    var title = (productTitle == null) ? "" : String(productTitle);
    var out = [];
    for (var i = 0; i < base.length; i++) {
      var it = base[i];
      if (!it || it.title !== title) out.push(it);
    }
    return out;
  };

  /**
   * persistCart(cart, storage)
   * Guarda el carrito en storage bajo 'carrito'. Retorna true/false según éxito.
   * @param {Array} cart
   * @param {{setItem:Function}=} storage
   * @returns {boolean}
   */
ns.persistCart = function persistCart(cart, storage) {
  // Sin fallback: si el storage es inválido, retorna false
  if (!storage || typeof storage.setItem !== "function") return false;
  try {
    // Serializa tal cual; si es circular, JSON.stringify lanzará y retornaremos false
    var json = JSON.stringify(cart);
    storage.setItem("carrito", json);
    return true;
  } catch (_) {
    return false;
  }
};

  /**
   * toggleCartState(isCartOpen)
   * Cambia booleano de abierto/cerrado. Si no es booleano, asume false->true.
   * @param {boolean} isCartOpen
   * @returns {boolean}
   */
  ns.toggleCartState = function toggleCartState(isCartOpen) {
    return !Boolean(isCartOpen);
  };

  /**
   * closeCartState()
   * Retorna siempre false (cerrado).
   * @returns {boolean}
   */
  ns.closeCartState = function closeCartState() {
    return false;
  };
})(window);
