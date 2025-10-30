// src/utils/PaymentFailed.logic.spec.js
// Usamos window.PaymentFailedLogic directamente (sin destructuring) para evitar redeclaraciones.

import '../utils/PaymentFailed.logic.js';
describe('PaymentFailed.logic', function () {
  var logic = window.PaymentFailedLogic;

  // -----------------------------
  // navigateTo(...)
  // -----------------------------
  describe('navigateTo', function () {
    it('navega a la ruta indicada cuando navigateFn es válido (entrada válida)', function () {
      var calledPath = null;
      function nav(p) { calledPath = p; }
      var ok = logic.navigateTo(nav, '/carrito');
      expect(ok).toBe(true);
      expect(calledPath).toBe('/carrito');
    });

    it('retorna false si navigateFn no es función (entrada incorrecta)', function () {
      var ok = logic.navigateTo(null, '/carrito');
      expect(ok).toBe(false);
    });

    it('retorna false si path es inválido (caso borde)', function () {
      function nav() {}
      expect(logic.navigateTo(nav, '')).toBe(false);
      expect(logic.navigateTo(nav, '   ')).toBe(false);
      expect(logic.navigateTo(nav, null)).toBe(false);
    });
  });

  // -----------------------------
  // onRetryClick(...)
  // -----------------------------
  describe('onRetryClick', function () {
    it('llama preventDefault y navega a /resumen-pedido (válido)', function () {
      var prevented = false;
      var path = null;
      var e = { preventDefault: function () { prevented = true; } };
      function nav(p) { path = p; }
      var ok = logic.onRetryClick(e, nav);
      expect(prevented).toBe(true);
      expect(ok).toBe(true);
      expect(path).toBe('/resumen-pedido');
    });

    it('funciona aunque no se pase evento (borde)', function () {
      var path = null;
      function nav(p) { path = p; }
      var ok = logic.onRetryClick(null, nav);
      expect(ok).toBe(true);
      expect(path).toBe('/resumen-pedido');
    });

    it('retorna false si navigateFn es inválido (incorrecto)', function () {
      var ok = logic.onRetryClick({ preventDefault: function () {} }, null);
      expect(ok).toBe(false);
    });
  });

  // -----------------------------
  // getErrorIconClass(...)
  // -----------------------------
  describe('getErrorIconClass', function () {
    it('retorna la clase esperada (válido)', function () {
      expect(logic.getErrorIconClass()).toBe('fas fa-times-circle');
    });

    it('no es cadena vacía (borde)', function () {
      expect(logic.getErrorIconClass().length > 0).toBe(true);
    });

    it('es estable en múltiples llamadas (borde)', function () {
      var a = logic.getErrorIconClass();
      var b = logic.getErrorIconClass();
      expect(a).toBe(b);
    });
  });

  // -----------------------------
  // getErrorText(...)
  // -----------------------------
  describe('getErrorText', function () {
    it('contiene el mensaje base (válido)', function () {
      var t = logic.getErrorText().toLowerCase();
      expect(t.indexOf('no pudimos procesar tu pago') !== -1).toBe(true);
    });

    it('no es cadena vacía (borde)', function () {
      expect(logic.getErrorText().length > 0).toBe(true);
    });

    it('es estable en múltiples llamadas (borde)', function () {
      var a = logic.getErrorText();
      var b = logic.getErrorText();
      expect(a).toBe(b);
    });
  });
});
