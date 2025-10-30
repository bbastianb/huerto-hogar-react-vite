// src/utils/PaymentFailed.logic.js
// Namespace global seguro para evitar redeclaraciones en Karma/Jasmine.
(function (global) {
  if (!global.PaymentFailedLogic) {
    global.PaymentFailedLogic = {};
  }
  var ns = global.PaymentFailedLogic;

  /**
   * navigateTo(navigateFn, path)
   * Navega a `path` si `navigateFn` es una función y `path` es string no vacío.
   * @param {Function} navigateFn
   * @param {string} path
   * @returns {boolean} true si navegó, false en caso contrario.
   */
  ns.navigateTo = function navigateTo(navigateFn, path) {
    if (typeof navigateFn !== "function") return false;
    if (typeof path !== "string" || !path.trim()) return false;
    try {
      navigateFn(path.trim());
      return true;
    } catch (_) {
      return false;
    }
  };

  /**
   * onRetryClick(e, navigateFn)
   * Handler para el botón "Reintentar pago".
   * - Llama preventDefault si existe.
   * - Navega a '/resumen-pedido' usando navigateTo.
   * @param {Event|null} e
   * @param {Function} navigateFn
   * @returns {boolean} true si navegó, false si no.
   */
  ns.onRetryClick = function onRetryClick(e, navigateFn) {
    try { if (e && typeof e.preventDefault === "function") e.preventDefault(); } catch (_) {}
    return ns.navigateTo(navigateFn, "/resumen-pedido");
  };

  /**
   * getErrorIconClass()
   * Retorna la clase del ícono de error.
   * @returns {string}
   */
  ns.getErrorIconClass = function getErrorIconClass() {
    return "fas fa-times-circle";
  };

  /**
   * getErrorText()
   * Retorna el texto principal del mensaje de error.
   * @returns {string}
   */
  ns.getErrorText = function getErrorText() {
    return "Lo sentimos, no pudimos procesar tu pago.";
  };
})(window);
