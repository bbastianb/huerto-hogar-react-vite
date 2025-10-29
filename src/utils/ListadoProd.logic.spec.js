// src/utils/ListadoProd.logic.spec.js
// Pruebas Jasmine para la lógica de ListadoProd.
// Importante: usamos window.ListadoProdLogic directamente, sin destructuración,
// para evitar errores de redeclaración en ciertos runners/entornos.
import '../utils/ListadoProd.logic.js'; // <-- Importa la lógica antes de usarla

describe('ListadoProd.logic', function () {
  var logic = window.ListadoProdLogic;

  // -----------------------------
  // Tests para loadProducts(...)
  // -----------------------------
  describe('loadProducts', function () {
    it('debe retornar el arreglo entregado por getProductsFn (entrada válida)', function () {
      var mock = function () { return [{ id: 1 }, { id: 2 }]; };
      var res = logic.loadProducts(mock);
      expect(Array.isArray(res)).toBe(true);
      expect(res.length).toBe(2); // Caso válido
    });

    it('debe retornar [] si getProductsFn es null/undefined o no es función (entrada nula/incorrecta)', function () {
      var res1 = logic.loadProducts(null);
      var res2 = logic.loadProducts(undefined);
      var res3 = logic.loadProducts(123);
      expect(res1).toEqual([]);
      expect(res2).toEqual([]);
      expect(res3).toEqual([]);
    });

    it('debe retornar [] si getProductsFn lanza excepción (caso borde)', function () {
      var throwing = function () { throw new Error('boom'); };
      var res = logic.loadProducts(throwing);
      expect(res).toEqual([]);
    });

    it('debe retornar [] si getProductsFn no retorna un arreglo (caso borde)', function () {
      var mock = function () { return { not: 'an array' }; };
      var res = logic.loadProducts(mock);
      expect(res).toEqual([]);
    });
  });

  // -----------------------------------
  // Tests para filterByCategory(...)
  // -----------------------------------
  describe('filterByCategory', function () {
    var products;

    beforeEach(function () {
      products = [
        { id: 1, name: 'A', category: 'frutas' },
        { id: 2, name: 'B', category: 'verduras' },
        { id: 3, name: 'C', category: 'frutas' },
        { id: 4, name: 'D', category: 'otros' }
      ];
    });

    function getCategoryFn(p) { return p.category; }

    it('debe retornar todos los productos si la categoría es "todos" (entrada válida)', function () {
      var res = logic.filterByCategory(products, 'todos', getCategoryFn);
      expect(res.length).toBe(products.length);
      // Asegura que es una copia superficial (no la misma referencia)
      expect(res).not.toBe(products);
    });

    it('debe filtrar por categoría válida usando getCategoryFn (entrada válida)', function () {
      var res = logic.filterByCategory(products, 'frutas', getCategoryFn);
      expect(res.length).toBe(2);
      expect(res[0].category).toBe('frutas');
      expect(res[1].category).toBe('frutas');
    });

    it('debe retornar [] si products no es un arreglo (entrada nula/incorrecta)', function () {
      var res1 = logic.filterByCategory(null, 'frutas', getCategoryFn);
      var res2 = logic.filterByCategory({}, 'frutas', getCategoryFn);
      expect(res1).toEqual([]);
      expect(res2).toEqual([]);
    });

    it('debe retornar [] si getCategoryFn no es función y la categoría NO es "todos" (caso borde)', function () {
      var res = logic.filterByCategory(products, 'frutas', null);
      expect(res).toEqual([]);
    });

    it('debe manejar categorías con espacios/mayúsculas (caso borde de normalización)', function () {
      var res = logic.filterByCategory(products, '  FrUtAs  ', getCategoryFn);
      expect(res.length).toBe(2);
      for (var i = 0; i < res.length; i++) {
        expect(res[i].category).toBe('frutas');
      }
    });

    it('debe retornar [] si ninguna categoría coincide (caso borde)', function () {
      var res = logic.filterByCategory(products, 'inexistente', getCategoryFn);
      expect(res).toEqual([]);
    });
  });
});
