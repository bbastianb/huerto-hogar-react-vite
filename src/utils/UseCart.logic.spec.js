// src/utils/UseCart.logic.spec.js
// Pruebas Jasmine usando window.UseCartLogic sin destructuración.
import '../utils/UseCart.logic.js'; // <-- Importa la lógica antes de usarla

describe('UseCart.logic', function () {
  var logic = window.UseCartLogic;

  // -----------------------------
  // loadSavedCart(...)
  // -----------------------------
  describe('loadSavedCart', function () {
    it('retorna [] si storage inválido (entrada incorrecta)', function () {
      var res = logic.loadSavedCart(null);
      expect(Array.isArray(res)).toBe(true);
      expect(res.length).toBe(0);
    });

    it('retorna [] si no hay clave carrito (caso borde)', function () {
      var mock = { getItem: function () { return null; } };
      var res = logic.loadSavedCart(mock);
      expect(res).toEqual([]);
    });

    it('retorna arreglo si JSON válido (entrada válida)', function () {
      var mock = { getItem: function () { return JSON.stringify([{ title: 'A' }]); } };
      var res = logic.loadSavedCart(mock);
      expect(res.length).toBe(1);
      expect(res[0].title).toBe('A');
    });
  });

  // -----------------------------
  // normalizeToCartItem(...)
  // -----------------------------
  describe('normalizeToCartItem', function () {
    it('convierte un producto válido (entrada válida)', function () {
      var item = logic.normalizeToCartItem({ id: 1, nombre: 'Manzana', precio: 1200 }, 2);
      expect(item).toEqual({ id: 1, title: 'Manzana', price: 1200, quantity: 2 });
    });

    it('retorna null si faltan campos (entrada incorrecta)', function () {
      var item = logic.normalizeToCartItem({ nombre: 'X' }, 1);
      expect(item).toBeNull();
    });

    it('corrige quantity inválida a 1 (caso borde)', function () {
      var item = logic.normalizeToCartItem({ id: 5, nombre: 'Pera', precio: 900 }, 0);
      expect(item.quantity).toBe(1);
    });
  });

  // -----------------------------
  // addItem(...)
  // -----------------------------
  describe('addItem', function () {
    it('agrega nuevo item si no existe (entrada válida)', function () {
      var prev = [];
      var product = { id: 1, nombre: 'Manzana', precio: 1000 };
      var out = logic.addItem(prev, product, 3);
      expect(out.length).toBe(1);
      expect(out[0].title).toBe('Manzana');
      expect(out[0].quantity).toBe(3);
      expect(prev).toEqual([]); // no muta
    });

    it('suma quantity si ya existe por title (entrada válida)', function () {
      var prev = [{ id: 1, title: 'Manzana', price: 1000, quantity: 2 }];
      var out = logic.addItem(prev, { id: 1, nombre: 'Manzana', precio: 1000 }, 4);
      expect(out.length).toBe(1);
      expect(out[0].quantity).toBe(6);
    });

    it('retorna copia si product inválido (entrada incorrecta)', function () {
      var prev = [{ id: 1, title: 'X', price: 10, quantity: 1 }];
      var out = logic.addItem(prev, null, 2);
      expect(out).toEqual(prev);
      expect(out).not.toBe(prev);
    });
  });

  // -----------------------------
  // removeItem(...)
  // -----------------------------
  describe('removeItem', function () {
    it('elimina por title (entrada válida)', function () {
      var prev = [
        { id: 1, title: 'A', price: 10, quantity: 1 },
        { id: 2, title: 'B', price: 20, quantity: 1 }
      ];
      var out = logic.removeItem(prev, 'A');
      expect(out.length).toBe(1);
      expect(out[0].title).toBe('B');
    });

    it('si title no coincide, devuelve copia igual (caso borde)', function () {
      var prev = [{ id: 1, title: 'A', price: 10, quantity: 1 }];
      var out = logic.removeItem(prev, 'Z');
      expect(out).toEqual(prev);
      expect(out).not.toBe(prev);
    });

    it('maneja prevCart inválido (entrada incorrecta)', function () {
      var out = logic.removeItem(null, 'A');
      expect(out).toEqual([]);
    });
  });

  // -----------------------------
  // persistCart(...)
  // -----------------------------
  describe('persistCart', function () {
    it('guarda JSON en storage (entrada válida)', function () {
      var saved = null;
      var mock = { setItem: function (k, v) { if (k === 'carrito') saved = v; } };
      var ok = logic.persistCart([{ title: 'A' }], mock);
      expect(ok).toBe(true);
      expect(typeof saved).toBe('string');
      expect(saved.indexOf('"title":"A"') !== -1).toBe(true);
    });

    it('retorna false si storage inválido (entrada incorrecta)', function () {
      var ok = logic.persistCart([{ title: 'A' }], null);
      expect(ok).toBe(false);
    });

    it('retorna false si JSON.stringify lanza (caso borde)', function () {
      var circular = {}; circular.me = circular;
      var mock = { setItem: function () {} };
      var ok = logic.persistCart(circular, mock);
      expect(ok).toBe(false);
    });
  });

  // -----------------------------
  // toggleCartState(...)
  // -----------------------------
  describe('toggleCartState', function () {
    it('invierte true->false (válido)', function () {
      expect(logic.toggleCartState(true)).toBe(false);
    });
    it('invierte false->true (válido)', function () {
      expect(logic.toggleCartState(false)).toBe(true);
    });
    it('si entrada inválida, trata como false y devuelve true (borde)', function () {
      expect(logic.toggleCartState(null)).toBe(true);
    });
  });

  // -----------------------------
  // closeCartState(...)
  // -----------------------------
  describe('closeCartState', function () {
    it('siempre retorna false (válido)', function () {
      expect(logic.closeCartState()).toBe(false);
    });
    it('ignora argumentos (borde)', function () {
      expect(logic.closeCartState(true)).toBe(false);
    });
    it('es determinista (borde)', function () {
      expect(logic.closeCartState()).toBe(false);
      expect(logic.closeCartState()).toBe(false);
    });
  });
});
