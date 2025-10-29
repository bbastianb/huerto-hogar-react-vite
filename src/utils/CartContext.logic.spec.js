// src/utils/CartContext.logic.spec.js
// ===========================================================
// 🧪 Pruebas unitarias para CartContext.logic.js
// ===========================================================
// Cada función tiene 3 tests:
//  - Caso válido
//  - Caso nulo/incorrecto
//  - Caso borde
// ===========================================================
import './CartContext.logic.js';
if (typeof window === 'undefined') {
  global.window = {};
}
window.CartContextLogic = window.CartContextLogic || {};
describe('🛒 CartContextLogic', function () {

  beforeEach(function () {
      localStorage.clear();
  });

  // --- cargarCarritoInicial ---
  it('debe cargar un carrito válido desde localStorage', function () {
      localStorage.setItem('carrito', JSON.stringify([{ id: 1, cantidad: 2 }]));
      const resultado = window.CartContextLogic.cargarCarritoInicial();
      expect(Array.isArray(resultado)).toBeTrue();
      expect(resultado[0].id).toBe(1);
  });

  it('debe retornar [] si localStorage está vacío', function () {
      const resultado = window.CartContextLogic.cargarCarritoInicial();
      expect(resultado).toEqual([]);
  });

  it('debe manejar datos corruptos sin lanzar error', function () {
      localStorage.setItem('carrito', '{error}');
      const resultado = window.CartContextLogic.cargarCarritoInicial();
      expect(resultado).toEqual([]);
  });

  // --- agregarAlCarrito ---
  it('debe agregar un nuevo producto al carrito', function () {
      const carrito = [];
      const producto = { id: 1, nombre: 'Producto', precio: 100 };
      const resultado = window.CartContextLogic.agregarAlCarrito(carrito, producto);
      expect(resultado.length).toBe(1);
      expect(resultado[0].cantidad).toBe(1);
  });

  it('debe incrementar cantidad si el producto ya existe', function () {
      const carrito = [{ id: 1, cantidad: 1 }];
      const producto = { id: 1, nombre: 'Producto', precio: 100 };
      const resultado = window.CartContextLogic.agregarAlCarrito(carrito, producto);
      expect(resultado[0].cantidad).toBe(2);
  });

  it('debe retornar carrito anterior si producto no es válido', function () {
      const carrito = [{ id: 1, cantidad: 1 }];
      const resultado = window.CartContextLogic.agregarAlCarrito(carrito, null);
      expect(resultado).toEqual(carrito);
  });

  // --- actualizarCantidad ---
  it('debe aumentar cantidad correctamente', function () {
      const carrito = [{ id: 1, cantidad: 1 }];
      const resultado = window.CartContextLogic.actualizarCantidad(carrito, 1, 2);
      expect(resultado[0].cantidad).toBe(3);
  });

  it('debe eliminar producto si cantidad llega a 0', function () {
      const carrito = [{ id: 1, cantidad: 1 }];
      const resultado = window.CartContextLogic.actualizarCantidad(carrito, 1, -1);
      expect(resultado.length).toBe(0);
  });

  it('debe retornar carrito original si entrada es inválida', function () {
      const resultado = window.CartContextLogic.actualizarCantidad(null, null, null);
      expect(resultado).toEqual([]);
  });

  // --- eliminarProducto ---
  it('debe eliminar un producto existente', function () {
      const carrito = [{ id: 1 }, { id: 2 }];
      const resultado = window.CartContextLogic.eliminarProducto(carrito, 1);
      expect(resultado.length).toBe(1);
      expect(resultado[0].id).toBe(2);
  });

  it('debe retornar carrito original si id no existe', function () {
      const carrito = [{ id: 1 }];
      const resultado = window.CartContextLogic.eliminarProducto(carrito, 99);
      expect(resultado).toEqual(carrito);
  });

  it('debe manejar entrada inválida sin error', function () {
      const resultado = window.CartContextLogic.eliminarProducto(null, null);
      expect(resultado).toEqual([]);
  });

  // --- limpiarCarrito ---
  it('debe retornar un array vacío', function () {
      const resultado = window.CartContextLogic.limpiarCarrito();
      expect(resultado).toEqual([]);
  });

  // --- calcularTotalProductos ---
  it('debe sumar correctamente las cantidades', function () {
      const carrito = [{ cantidad: 2 }, { cantidad: 3 }];
      const resultado = window.CartContextLogic.calcularTotalProductos(carrito);
      expect(resultado).toBe(5);
  });

  it('debe retornar 0 si el carrito es inválido', function () {
      const resultado = window.CartContextLogic.calcularTotalProductos(null);
      expect(resultado).toBe(0);
  });

  it('debe retornar 0 si los productos no tienen cantidad', function () {
      const carrito = [{}, {}];
      const resultado = window.CartContextLogic.calcularTotalProductos(carrito);
      expect(resultado).toBe(0);
  });
});
