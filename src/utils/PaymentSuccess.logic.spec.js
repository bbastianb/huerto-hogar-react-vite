// src/utils/PaymentSuccess.logic.spec.js
// Usamos window.PaymentSuccessLogic directamente (sin destructuring).
import '../utils/PaymentSuccess.logic.js';
describe('PaymentSuccess.logic', function () {
  var logic = window.PaymentSuccessLogic;

  // -----------------------------
  // extractOrder(...)
  // -----------------------------
  describe('extractOrder', function () {
    it('extrae order cuando existe en location.state (válido)', function () {
      var location = { state: { order: { id: 'ORD-1', total: 10 } } };
      var order = logic.extractOrder(location);
      expect(order).toEqual({ id: 'ORD-1', total: 10 });
    });

    it('retorna null cuando location no tiene state/order (incorrecto)', function () {
      expect(logic.extractOrder({})).toBeNull();
      expect(logic.extractOrder({ state: {} })).toBeNull();
    });

    it('retorna null con entrada inválida (borde)', function () {
      expect(logic.extractOrder(null)).toBeNull();
      expect(logic.extractOrder(undefined)).toBeNull();
    });
  });

  // -----------------------------
  // shouldShowOrder(...)
  // -----------------------------
  describe('shouldShowOrder', function () {
    it('true si hay id o total válido (válido)', function () {
      expect(logic.shouldShowOrder({ id: 'A' })).toBe(true);
      expect(logic.shouldShowOrder({ total: 12.5 })).toBe(true);
    });

    it('false si order inválido o vacío (incorrecto)', function () {
      expect(logic.shouldShowOrder(null)).toBe(false);
      expect(logic.shouldShowOrder({})).toBe(false);
    });

    it('true si total es string numérico (borde)', function () {
      expect(logic.shouldShowOrder({ total: '99.99' })).toBe(true);
    });
  });

  // -----------------------------
  // formatMoney(...)
  // -----------------------------
  describe('formatMoney', function () {
    it('formatea a 2 decimales (válido)', function () {
      expect(logic.formatMoney(3)).toBe('3.00');
      expect(logic.formatMoney(3.456)).toBe('3.46');
    });

    it('acepta string numérico (válido)', function () {
      expect(logic.formatMoney('12.3')).toBe('12.30');
    });

    it('retorna "0.00" para entradas no numéricas (incorrecto/borde)', function () {
      expect(logic.formatMoney('x')).toBe('0.00');
      expect(logic.formatMoney(undefined)).toBe('0.00');
      expect(logic.formatMoney(NaN)).toBe('0.00');
    });
  });

  // -----------------------------
  // getSuccessIconClass(...)
  // -----------------------------
  describe('getSuccessIconClass', function () {
    it('retorna la clase esperada (válido)', function () {
      expect(logic.getSuccessIconClass()).toBe('fas fa-check-circle');
    });

    it('no es cadena vacía (borde)', function () {
      expect(logic.getSuccessIconClass().length > 0).toBe(true);
    });

    it('estable en múltiples llamadas (borde)', function () {
      var a = logic.getSuccessIconClass();
      var b = logic.getSuccessIconClass();
      expect(a).toBe(b);
    });
  });

  // -----------------------------
  // getSuccessText(...)
  // -----------------------------
  describe('getSuccessText', function () {
    it('contiene el mensaje base (válido)', function () {
      var t = logic.getSuccessText().toLowerCase();
      expect(t.indexOf('pedido ha sido procesado') !== -1).toBe(true);
    });

    it('no es cadena vacía (borde)', function () {
      expect(logic.getSuccessText().length > 0).toBe(true);
    });

    it('estable en múltiples llamadas (borde)', function () {
      var a = logic.getSuccessText();
      var b = logic.getSuccessText();
      expect(a).toBe(b);
    });
  });
});
