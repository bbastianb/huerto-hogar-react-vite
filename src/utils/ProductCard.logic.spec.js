// src/utils/ProductCard.logic.spec.js
// Pruebas Jasmine usando el namespace global sin destructurar para evitar redeclaraciones.

import '../utils/ProductCard.logic.js'; // <-- Importa la lógica antes de usarla

describe('ProductCard.logic', function () {
  var logic = window.ProductCardLogic;

  // -----------------------------
  // Tests: safeAddToCart(...)
  // -----------------------------
  describe('safeAddToCart', function () {
    it('agrega al carrito con entrada válida (evento + función + producto)', function () {
      var prevented = false;
      var stopped = false;
      var e = {
        preventDefault: function () { prevented = true; },
        stopPropagation: function () { stopped = true; }
      };
      var agregado = null;
      function agregarAlCarrito(p) { agregado = p; }

      var product = { id: 1, nombre: 'Manzana' };
      var ok = logic.safeAddToCart(e, agregarAlCarrito, product);

      expect(ok).toBe(true);                 // Se agregó correctamente
      expect(prevented).toBe(true);          // preventDefault llamado
      expect(stopped).toBe(true);            // stopPropagation llamado
      expect(agregado).toBe(product);        // Se pasó el producto correcto
    });

    it('retorna false si agregarAlCarrito no es función (entrada incorrecta)', function () {
      var ok = logic.safeAddToCart(null, null, { id: 1 });
      expect(ok).toBe(false);
    });

    it('retorna false si product es nulo (caso borde)', function () {
      var agregado = false;
      function agregarAlCarrito() { agregado = true; }
      var ok = logic.safeAddToCart(null, agregarAlCarrito, null);
      expect(ok).toBe(false);
      expect(agregado).toBe(false);
    });
  });

  // -----------------------------
  // Tests: onImageError(...)
  // -----------------------------
  describe('onImageError', function () {
    it('reemplaza la src por el fallback indicado (entrada válida)', function () {
      var img = { src: 'bad.png' };
      var e = { target: img };
      var applied = logic.onImageError(e, 'https://example.com/fallback.png');
      expect(applied).toBe('https://example.com/fallback.png');
      expect(img.src).toBe('https://example.com/fallback.png');
    });

    it('usa placeholder por defecto si no se entrega fallback (entrada válida, sin fallback)', function () {
      var img = { src: 'bad2.png' };
      var e = { target: img };
      var applied = logic.onImageError(e);
      expect(typeof applied).toBe('string');
      expect(applied.indexOf('via.placeholder.com')).not.toBe(-1);
      expect(img.src).toBe(applied);
    });

    it('retorna null si el evento es inválido (entrada nula/incorrecta)', function () {
      var applied = logic.onImageError(null, 'https://x.com/y.png');
      expect(applied).toBeNull();
    });
  });

  // -----------------------------
  // Tests: getProductDetailPath(...)
  // -----------------------------
  describe('getProductDetailPath', function () {
    it('construye ruta válida cuando hay id (entrada válida)', function () {
      var p = { id: 'ABC123' };
      var path = logic.getProductDetailPath(p);
      expect(path).toBe('/productos/ABC123');
    });

    it('retorna null si no hay product o id (entrada nula/incorrecta)', function () {
      var p1 = null;
      var p2 = { id: '' };
      expect(logic.getProductDetailPath(p1)).toBeNull();
      expect(logic.getProductDetailPath(p2)).toBeNull();
    });

    it('acepta id numérico y lo convierte a string (caso borde)', function () {
      var p = { id: 99 };
      var path = logic.getProductDetailPath(p);
      expect(path).toBe('/productos/99');
    });
  });
});
