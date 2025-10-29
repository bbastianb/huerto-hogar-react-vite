// src/utils/DetalleProd.logic.spec.js
// =========================================================
// 🧪 Pruebas unitarias Jasmine para DetalleProd.logic.js
// Usa window.DetalleProdLogic directamente (sin destructuración)
// =========================================================
import '../utils/DetalleProd.logic.js';

describe('🧠 DetalleProdLogic', () => {

    // -----------------------------------------
    // handleAddToCart
    // -----------------------------------------
    describe('handleAddToCart', () => {

        it('✅ debe agregar el producto la cantidad correcta de veces', () => {
            let contador = 0;
            function agregarAlCarritoMock() { contador++; }
            function setAddedToCartMock() {}

            const producto = { id: 'P1', nombre: 'Manzana' };
            window.DetalleProdLogic.handleAddToCart(producto, 3, agregarAlCarritoMock, setAddedToCartMock);
            expect(contador).toBe(3);
        });

        it('⚠️ debe manejar cantidad inválida y agregar al menos una vez', () => {
            let contador = 0;
            function agregarAlCarritoMock() { contador++; }
            window.DetalleProdLogic.handleAddToCart({ id: 'P2' }, 0, agregarAlCarritoMock, () => {});
            expect(contador).toBe(1);
        });

        it('🚫 no debe lanzar error si los parámetros son inválidos', () => {
            expect(() => window.DetalleProdLogic.handleAddToCart(null, 2, null, null)).not.toThrow();
        });
    });

    // -----------------------------------------
    // handleQuantityChange
    // -----------------------------------------
    describe('handleQuantityChange', () => {

        it('✅ debe actualizar la cantidad con un número válido', () => {
            let resultado = 0;
            window.DetalleProdLogic.handleQuantityChange({ target: { value: '5' } }, (v) => resultado = v);
            expect(resultado).toBe(5);
        });

        it('⚠️ debe asignar 1 si el valor es menor que 1 o no numérico', () => {
            let resultado = 99;
            window.DetalleProdLogic.handleQuantityChange({ target: { value: '0' } }, (v) => resultado = v);
            expect(resultado).toBe(1);
        });

        it('🚫 debe manejar errores sin lanzar excepción', () => {
            expect(() => window.DetalleProdLogic.handleQuantityChange(null, () => {})).not.toThrow();
        });
    });

});
