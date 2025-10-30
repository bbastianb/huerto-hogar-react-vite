// src/utils/Contacto.logic.js
// Namespace global seguro para evitar redeclaraciones con Karma/Jasmine.
(function (global) {
  if (!global.ContactoLogic) {
    global.ContactoLogic = {};
  }
  var ns = global.ContactoLogic;

  /**
   * updateForm(prevForm, name, value)
   * Emula el setForm(prev => ({...prev, [name]: value})) de React sin mutar.
   * - Si prevForm es inválido, parte de {}.
   * - Si name es vacío/inválido, retorna copia superficial de prevForm.
   * @param {Object} prevForm
   * @param {string} name
   * @param {any} value
   * @returns {Object} nuevo form
   */
  ns.updateForm = function updateForm(prevForm, name, value) {
    var base = (prevForm && typeof prevForm === 'object') ? prevForm : {};
    if (typeof name !== 'string' || name.trim() === '') {
      // devuelve copia superficial para mantener inmutabilidad
      var copy = {};
      for (var k in base) if (Object.prototype.hasOwnProperty.call(base, k)) copy[k] = base[k];
      return copy;
    }
    var out = {};
    for (var k2 in base) if (Object.prototype.hasOwnProperty.call(base, k2)) out[k2] = base[k2];
    out[name] = value;
    return out;
  };

  /**
   * isValidEmail(email)
   * Valida formato básico de email (regex simple y segura).
   * @param {string} email
   * @returns {boolean}
   */
  ns.isValidEmail = function isValidEmail(email) {
    if (typeof email !== 'string') return false;
    var s = email.trim();
    if (!s) return false;
    // Regex básica: algo@algo.dominio (sin ser demasiado restrictiva)
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(s);
  };

  /**
   * validateForm(form)
   * Valida que nombre, email y mensaje existan y que email tenga formato válido.
   * @param {Object} form - { nombre, email, mensaje }
   * @returns {boolean}
   */
  ns.validateForm = function validateForm(form) {
    if (!form || typeof form !== 'object') return false;
    var nombre = (form.nombre || '').toString().trim();
    var email = (form.email || '').toString().trim();
    var mensaje = (form.mensaje || '').toString().trim();
    if (!nombre || !email || !mensaje) return false;
    if (!ns.isValidEmail(email)) return false;
    return true;
  };

  /**
   * submitForm(e, form, validateFn?)
   * Emula onSubmit del componente:
   * - Llama preventDefault si está disponible.
   * - Si se provee validateFn y retorna false/lanza, devuelve false.
   * - Si no hay validateFn, por defecto devuelve true (como el componente actual).
   * @param {Event|null} e
   * @param {Object} form
   * @param {Function=} validateFn  (opcional)
   * @returns {boolean} true si se debe marcar como enviado (setSent(true))
   */
  ns.submitForm = function submitForm(e, form, validateFn) {
    try { if (e && typeof e.preventDefault === 'function') e.preventDefault(); } catch (_) {}
    if (typeof validateFn === 'function') {
      try {
        return !!validateFn(form);
      } catch (_) {
        return false;
      }
    }
    // sin validador, replica el comportamiento actual del componente
    return true;
  };

  /**
   * computeThanksName(form)
   * Devuelve el nombre de saludo para el mensaje de gracias.
   * Si no hay nombre válido, retorna "amiga/o".
   * @param {Object} form
   * @returns {string}
   */
  ns.computeThanksName = function computeThanksName(form) {
    var n = form && form.nombre != null ? String(form.nombre).trim() : '';
    return n ? n : 'amiga/o';
  };
})(window);
