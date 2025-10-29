// src/utils/CartPage.logic.spec.js
// ===========================================================
// 🧪 Pruebas unitarias para CartPage.logic.js
// ===========================================================

import '../utils/CartPage.logic.js';

describe('🛍️ CartPageLogic', function () {

  beforeAll(() => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');
  });

  // --- handleAumentarCantidad ---
  it('debe aumentar cantidad correctamente', function () {
    let llamado = false;
    const actualizar = (id, cantidad) => { llamado = id === 1 && cantidad === 1; };
    const ok = window.CartPageLogic.handleAumentarCantidad(actualizar, 1);
    expect(ok).toBeTrue();
    expect(llamado).toBeTrue();
  });

  it('no debe ejecutar si actualizarCantidad no es función', function () {
    const ok = window.CartPageLogic.handleAumentarCantidad(null, 1);
    expect(ok).toBeFalse();
  });

  it('no debe ejecutar si productoId es inválido', function () {
    const ok = window.CartPageLogic.handleAumentarCantidad(() => {}, null);
    expect(ok).toBeFalse();
  });

  // --- handleDisminuirCantidad ---
  it('debe disminuir cantidad cuando >1', function () {
    const carrito = [{ id: 1, cantidad: 2 }];
    let accion = '';
    const actualizar = () => { accion = 'actualizar'; };
    const eliminar = () => { accion = 'eliminar'; };
    window.CartPageLogic.handleDisminuirCantidad(carrito, actualizar, eliminar, 1);
    expect(accion).toBe('actualizar');
  });

  it('debe eliminar producto si cantidad es 1', function () {
    const carrito = [{ id: 1, cantidad: 1 }];
    let accion = '';
    const actualizar = () => { accion = 'actualizar'; };
    const eliminar = () => { accion = 'eliminar'; };
    window.CartPageLogic.handleDisminuirCantidad(carrito, actualizar, eliminar, 1);
    expect(accion).toBe('eliminar');
  });

  it('no debe ejecutar si producto no existe', function () {
    const carrito = [{ id: 2, cantidad: 1 }];
    const ok = window.CartPageLogic.handleDisminuirCantidad(carrito, () => {}, () => {}, 99);
    expect(ok).toBeFalse();
  });

  // --- handleEliminarProducto ---
  it('debe eliminar producto si usuario confirma', function () {
    let eliminado = false;
    const eliminar = () => { eliminado = true; };
    const ok = window.CartPageLogic.handleEliminarProducto(eliminar, 1, () => true);
    expect(ok).toBeTrue();
    expect(eliminado).toBeTrue();
  });

  it('no debe eliminar si usuario cancela', function () {
    let eliminado = false;
    const eliminar = () => { eliminado = true; };
    const ok = window.CartPageLogic.handleEliminarProducto(eliminar, 1, () => false);
    expect(ok).toBeFalse();
    expect(eliminado).toBeFalse();
  });

  it('debe retornar false si eliminarProducto es inválido', function () {
    const ok = window.CartPageLogic.handleEliminarProducto(null, 1, () => true);
    expect(ok).toBeFalse();
  });

  // --- handleCheckout ---
  it('debe navegar correctamente si carrito tiene productos', function () {
    const carrito = [{ id: 1 }];
    let destino = '';
    const navigate = (path) => { destino = path; };
    const ok = window.CartPageLogic.handleCheckout(carrito, navigate);
    expect(ok).toBeTrue();
    expect(destino).toBe('/checkout');
  });

  it('debe alertar si carrito está vacío', function () {
    const carrito = [];
    let alertado = false;
    const alertFn = () => { alertado = true; };
    const navigate = () => {};
    const ok = window.CartPageLogic.handleCheckout(carrito, navigate, alertFn);
    expect(ok).toBeFalse();
    expect(alertado).toBeTrue();
  });

  it('debe retornar false si navigate es inválido', function () {
    const ok = window.CartPageLogic.handleCheckout([], null);
    expect(ok).toBeFalse();
  });
});
