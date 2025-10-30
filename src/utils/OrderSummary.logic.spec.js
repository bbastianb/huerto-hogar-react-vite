// src/utils/OrderSummary.logic.spec.js
// Usamos window.OrderSummaryLogic sin destructurar para evitar redeclaraciones.
import '../utils/OrderSummary.logic.js'; 
describe('OrderSummary.logic', function () {
  var logic = window.OrderSummaryLogic;

  // loadShippingData
  describe('loadShippingData', function () {
    it('retorna {} si storage inválido', function () {
      expect(logic.loadShippingData(null)).toEqual({});
    });
    it('lee y parsea JSON válido', function () {
      var mock = { getItem: function () { return '{"metodoEnvio":"express"}'; } };
      expect(logic.loadShippingData(mock)).toEqual({ metodoEnvio: 'express' });
    });
    it('maneja JSON inválido retornando {}', function () {
      var mock = { getItem: function () { return '{bad'; } };
      expect(logic.loadShippingData(mock)).toEqual({});
    });
  });

  // calcSubtotal
  describe('calcSubtotal', function () {
    it('suma precio*cantidad de items válidos', function () {
      var cart = [{ precio: 10, cantidad: 2 }, { precio: 5, cantidad: 3 }];
      expect(logic.calcSubtotal(cart)).toBe(10*2 + 5*3);
    });
    it('ignora entradas inválidas', function () {
      var cart = [{ precio: 10, cantidad: 2 }, { precio: 'x', cantidad: 3 }];
      expect(logic.calcSubtotal(cart)).toBe(20);
    });
    it('retorna 0 si cart no es arreglo', function () {
      expect(logic.calcSubtotal(null)).toBe(0);
    });
  });

  // calcShippingCost
  describe('calcShippingCost', function () {
    it('express => 20', function () {
      expect(logic.calcShippingCost('express')).toBe(20);
    });
    it('otro => 10', function () {
      expect(logic.calcShippingCost('standard')).toBe(10);
    });
    it('entrada inválida => 10', function () {
      expect(logic.calcShippingCost(null)).toBe(10);
    });
  });

  // calcTotal
  describe('calcTotal', function () {
    it('suma subtotal + envío', function () {
      expect(logic.calcTotal(30, 10)).toBe(40);
    });
    it('maneja números como strings', function () {
      expect(logic.calcTotal('30', '10')).toBe(40);
    });
    it('retorna 0 si resultado no es finito', function () {
      expect(logic.calcTotal('x', 10)).toBe(0);
    });
  });

  // buildOrder
  describe('buildOrder', function () {
    it('arma la orden con funciones inyectables', function () {
      var cart = [{ id: 1 }];
      var shipping = { metodoEnvio: 'express' };
      var order = logic.buildOrder(cart, shipping, 99.5, function () { return '2020-01-01T00:00:00.000Z'; }, function () { return 'ORD-123456'; });
      expect(order.id).toBe('ORD-123456');
      expect(order.fecha).toBe('2020-01-01T00:00:00.000Z');
      expect(order.total).toBe(99.5);
      expect(order.productos[0].id).toBe(1);
      expect(order.shipping.metodoEnvio).toBe('express');
      expect(order.estado).toBe('completado');
    });
    it('copia el carrito (no referencia)', function () {
      var cart = [{ id: 1 }];
      var order = logic.buildOrder(cart, {}, 10);
      expect(order.productos).not.toBe(cart);
      expect(order.productos).toEqual(cart);
    });
    it('maneja entradas inválidas saneando', function () {
      var order = logic.buildOrder(null, null, 'x');
      expect(order.total).toBe(0);
      expect(Array.isArray(order.productos)).toBe(true);
      expect(typeof order.shipping).toBe('object');
    });
  });

  // persistOrder
  describe('persistOrder', function () {
    it('guarda la orden en orders', function () {
      var saved = null;
      var mock = {
        _v: '[]',
        getItem: function (k) { return this._v; },
        setItem: function (k, v) { if (k === 'orders') this._v = v; saved = v; }
      };
      var ok = logic.persistOrder({ id: 'X' }, mock);
      expect(ok).toBe(true);
      expect(saved.indexOf('"id":"X"') !== -1).toBe(true);
    });
    it('retorna false si storage inválido', function () {
      expect(logic.persistOrder({ id: 'X' }, null)).toBe(false);
    });
    it('retorna false si JSON inválido en storage', function () {
      var mock = {
        getItem: function () { return '{bad'; },
        setItem: function () {}
      };
      expect(logic.persistOrder({ id: 'X' }, mock)).toBe(false);
    });
  });

  // clearCart
  describe('clearCart', function () {
    it('llama eliminarProducto por cada item', function () {
      var ids = [];
      function eliminar(id) { ids.push(id); }
      var count = logic.clearCart(eliminar, [{ id: 1 }, { id: 2 }]);
      expect(count).toBe(2);
      expect(ids).toEqual([1, 2]);
    });
    it('retorna 0 si eliminarProducto inválido', function () {
      expect(logic.clearCart(null, [{ id: 1 }])).toBe(0);
    });
    it('retorna 0 si cart vacío', function () {
      expect(logic.clearCart(function(){}, [])).toBe(0);
    });
  });

  // isCartEmpty
  describe('isCartEmpty', function () {
    it('true si []', function () {
      expect(logic.isCartEmpty([])).toBe(true);
    });
    it('false si hay elementos', function () {
      expect(logic.isCartEmpty([{ id: 1 }])).toBe(false);
    });
    it('true si cart inválido', function () {
      expect(logic.isCartEmpty(null)).toBe(true);
    });
  });

  // simulatePaymentResult
  describe('simulatePaymentResult', function () {
    it('true cuando rand > 0.5', function () {
      expect(logic.simulatePaymentResult(function () { return 0.6; })).toBe(true);
    });
    it('false cuando rand <= 0.5', function () {
      expect(logic.simulatePaymentResult(function () { return 0.5; })).toBe(false);
    });
    it('usa Math.random si no se provee', function () {
      // No podemos asegurar determinismo; sólo verificamos boolean
      var r = logic.simulatePaymentResult();
      expect(typeof r === 'boolean').toBe(true);
    });
  });

  // onImageError
  describe('onImageError', function () {
    it('reemplaza src por fallback dado', function () {
      var img = { src: 'bad' };
      var e = { target: img };
      var applied = logic.onImageError(e, 'https://x/y.png');
      expect(applied).toBe('https://x/y.png');
      expect(img.src).toBe('https://x/y.png');
    });
    it('usa placeholder si no hay fallback', function () {
      var img = { src: 'bad' };
      var e = { target: img };
      var applied = logic.onImageError(e);
      expect(applied.indexOf('placeholder.com') !== -1).toBe(true);
      expect(img.src).toBe(applied);
    });
    it('retorna null si evento inválido', function () {
      expect(logic.onImageError(null, 'x')).toBeNull();
    });
  });
});
