// src/utils/PaymentSuccess.logic.js
// Namespace global seguro para evitar redeclaraciones en Karma/Jasmine.
(function (global) {
  if (!global.PaymentSuccessLogic) {
    global.PaymentSuccessLogic = {};
  }
  var ns = global.PaymentSuccessLogic;

  /**
   * extractOrder(locationLike)
   * Obtiene de forma segura el objeto "order" desde una ubicación al estilo react-router
   * (location.state?.order). Si no existe, retorna null.
   * @param {Object} locationLike
   * @returns {Object|null}
   */
  ns.extractOrder = function extractOrder(locationLike) {
    if (!locationLike || typeof locationLike !== "object") return null;
    var state = locationLike.state;
    if (!state || typeof state !== "object") return null;
    var order = state.order;
    return order && typeof order === "object" ? order : null;
  };

  /**
   * shouldShowOrder(order)
   * Determina si se deben mostrar los detalles del pedido.
   * Retorna true si hay un objeto y al menos id o total válido.
   * @param {Object|null} order
   * @returns {boolean}
   */
  ns.shouldShowOrder = function shouldShowOrder(order) {
    if (!order || typeof order !== "object") return false;
    var hasId = order.id != null && String(order.id).trim() !== "";
    var total = Number(order.total);
    var hasTotal = isFinite(total);
    return hasId || hasTotal;
  };

  /**
   * formatMoney(n)
   * Devuelve una cadena con 2 decimales para un número dado. Si no es finito, '0.00'.
   * @param {any} n
   * @returns {string}
   */
  ns.formatMoney = function formatMoney(n) {
    var num = Number(n);
    if (!isFinite(num)) return "0.00";
    return num.toFixed(2);
  };

  /**
   * getSuccessIconClass()
   * Clase del ícono de éxito (compatible con el JSX actual).
   * @returns {string}
   */
  ns.getSuccessIconClass = function getSuccessIconClass() {
    return "fas fa-check-circle";
  };

  /**
   * getSuccessText()
   * Mensaje principal de éxito.
   * @returns {string}
   */
  ns.getSuccessText = function getSuccessText() {
    return "Tu pedido ha sido procesado correctamente. Te hemos enviado un email de confirmación.";
  };
})(window);
