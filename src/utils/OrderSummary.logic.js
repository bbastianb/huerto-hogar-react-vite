// src/utils/OrderSummary.logic.js
// Namespace global seguro para Karma/Jasmine y recargas.
(function (global) {
  if (!global.OrderSummaryLogic) global.OrderSummaryLogic = {};
  var ns = global.OrderSummaryLogic;

  /**
   * loadShippingData(storage)
   * Lee JSON desde la clave 'shippingData'. Si falla, retorna {}.
   */
  ns.loadShippingData = function loadShippingData(storage) {
    try {
      if (!storage || typeof storage.getItem !== 'function') return {};
      var raw = storage.getItem('shippingData');
      if (!raw) return {};
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (_) {
      return {};
    }
  };

  /**
   * calcSubtotal(cart)
   * Suma precio*cantidad de cada item. Maneja entradas inválidas retornando 0.
   */
  ns.calcSubtotal = function calcSubtotal(cart) {
    if (!Array.isArray(cart)) return 0;
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
      var it = cart[i] || {};
      var price = Number(it.precio);
      var qty = Number(it.cantidad);
      if (isFinite(price) && isFinite(qty) && qty > 0) {
        total += price * qty;
      }
    }
    return total;
  };

  /**
   * calcShippingCost(method)
   * 'express' => 20; cualquier otro => 10 (por defecto).
   */
  ns.calcShippingCost = function calcShippingCost(method) {
    return (String(method || '').trim().toLowerCase() === 'express') ? 20 : 10;
  };

  /**
   * calcTotal(subtotal, shipping)
   * Suma y asegura número finito. Si no, retorna 0.
   */
  ns.calcTotal = function calcTotal(subtotal, shipping) {
    var s = Number(subtotal), e = Number(shipping);
    var t = s + e;
    return isFinite(t) ? t : 0;
  };

  /**
   * buildOrder(cart, shippingData, total, nowFn, idFn)
   * Crea un objeto orden listo para persistir.
   * nowFn(): string ISO - por defecto new Date().toISOString()
   * idFn(): string id - por defecto 'ORD-' + últimos 6 de Date.now()
   */
  ns.buildOrder = function buildOrder(cart, shippingData, total, nowFn, idFn) {
    var productos = Array.isArray(cart) ? cart.slice() : [];
    var shipping = shippingData && typeof shippingData === 'object' ? shippingData : {};
    var fecha = (typeof nowFn === 'function') ? nowFn() : new Date().toISOString();
    var id = (typeof idFn === 'function')
      ? idFn()
      : ('ORD-' + String(Date.now()).slice(-6));
    return {
      id: id,
      fecha: fecha,
      productos: productos,
      shipping: shipping,
      total: Number(total) || 0,
      estado: 'completado'
    };
  };

  /**
   * persistOrder(order, storage)
   * Inserta la orden al final de la lista 'orders' en storage. true/false.
   */
  ns.persistOrder = function persistOrder(order, storage) {
    if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
      return false;
    }
    try {
      var raw = storage.getItem('orders');
      var arr = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(arr)) arr = [];
      arr.push(order);
      storage.setItem('orders', JSON.stringify(arr));
      return true;
    } catch (_) {
      return false;
    }
  };

  /**
   * clearCart(eliminarProducto, cart)
   * Llama a eliminarProducto(id) para cada producto del carrito. Devuelve count de eliminados.
   */
  ns.clearCart = function clearCart(eliminarProducto, cart) {
    if (typeof eliminarProducto !== 'function') return 0;
    if (!Array.isArray(cart) || cart.length === 0) return 0;
    var count = 0;
    for (var i = 0; i < cart.length; i++) {
      try { eliminarProducto(cart[i].id); count++; } catch (_) {}
    }
    return count;
  };

  /**
   * isCartEmpty(cart)
   * true si no hay items válidos.
   */
  ns.isCartEmpty = function isCartEmpty(cart) {
    return !Array.isArray(cart) || cart.length === 0;
  };

  /**
   * simulatePaymentResult(randFn)
   * Emula el 50/50: >0.5 éxito. randFn por defecto Math.random.
   */
  ns.simulatePaymentResult = function simulatePaymentResult(randFn) {
    var r = (typeof randFn === 'function') ? randFn() : Math.random();
    return Number(r) > 0.5;
  };

  /**
   * onImageError(e, fallbackUrl)
   * Handler para <img onError>: reemplaza src por fallback (o placeholder).
   */
  ns.onImageError = function onImageError(e, fallbackUrl) {
    var fallback = (typeof fallbackUrl === 'string' && fallbackUrl.trim())
      ? fallbackUrl.trim()
      : 'https://via.placeholder.com/60x60?text=Imagen';
    if (!e || !e.target) return null;
    try { e.target.src = fallback; return fallback; } catch (_) { return null; }
  };

})(window);
