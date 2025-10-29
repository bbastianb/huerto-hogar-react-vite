// src/utils/Header.logic.js
// Namespace global seguro para evitar redeclaraciones al correr Karma/Jasmine.
(function (global) {
  if (!global.HeaderLogic) {
    global.HeaderLogic = {};
  }
  var ns = global.HeaderLogic;

  /**
   * computeDisplayName(user)
   * Aplica la misma prioridad que el componente:
   * nombre > name > username > (email local-part) > "Mi cuenta"
   * @param {Object|null|undefined} user
   * @returns {string}
   */
  ns.computeDisplayName = function computeDisplayName(user) {
    if (!user || typeof user !== 'object') return 'Mi cuenta';
    if (user.nombre) return String(user.nombre);
    if (user.name) return String(user.name);
    if (user.username) return String(user.username);
    if (user.email && typeof user.email === 'string' && user.email.includes('@')) {
      return user.email.split('@')[0];
    }
    return 'Mi cuenta';
  };

  /**
   * toggleMenuState(isOpen)
   * Invierte el estado del menú.
   * @param {boolean} isOpen
   * @returns {boolean}
   */
  ns.toggleMenuState = function toggleMenuState(isOpen) {
    return !Boolean(isOpen);
  };

  /**
   * shouldCloseOnDocumentMouseDown(target, menuElement)
   * Devuelve true si se debe cerrar el menú: cuando existe menuElement
   * y el click fue FUERA de ese elemento.
   * @param {EventTarget|null} target
   * @param {HTMLElement|null} menuElement
   * @returns {boolean}
   */
  ns.shouldCloseOnDocumentMouseDown = function shouldCloseOnDocumentMouseDown(target, menuElement) {
    if (!menuElement || typeof menuElement.contains !== 'function') return false;
    return !menuElement.contains(target);
  };

  /**
   * handleLogout(logoutFn, navigateFn)
   * Ejecuta el logout y navega a "/" si se provee navigateFn.
   * Devuelve true si el logout se ejecutó (no lanza), false si no hay función válida.
   * @param {Function} logoutFn
   * @param {Function} navigateFn
   * @returns {boolean}
   */
  ns.handleLogout = function handleLogout(logoutFn, navigateFn) {
    if (typeof logoutFn !== 'function') return false;
    try {
      logoutFn();
      if (typeof navigateFn === 'function') navigateFn('/');
      return true;
    } catch (_) {
      return false;
    }
  };
})(window);
