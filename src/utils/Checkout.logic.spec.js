/**
 * Pruebas unitarias para Checkout.logic.js
 * Ejecutables con `npm run test:karma`
 */
import '../utils/Checkout.logic.js'; 

describe('🧪 CheckoutLogic', () => {
    beforeAll(() => {
        spyOn(console, 'error'); // silencia errores esperados
    });

    // Mock helpers
    const mockSetState = () => {
        let value = null;
        const fn = (cb) => {
            if (typeof cb === 'function') value = cb(value || {});
            else value = cb;
        };
        fn.getValue = () => value;
        return fn;
    };

    /* ------------------------------------------------------------------
     * 🔹 Tests para handleInputChange
     * ------------------------------------------------------------------ */
    describe('handleInputChange', () => {
        it('debe actualizar el campo indicado en formData', () => {
            const setFormData = mockSetState();
            const setErrors = mockSetState();
            const e = { target: { name: 'nombre', value: 'Juan' } };
            window.CheckoutLogic.handleInputChange(e, setFormData, {}, setErrors);
            expect(setFormData.getValue().nombre).toBe('Juan');
        });

        it('debe limpiar el error del campo modificado si existía', () => {
            const setFormData = mockSetState();
            const setErrors = mockSetState();
            const e = { target: { name: 'email', value: 'a@a.com' } };
            window.CheckoutLogic.handleInputChange(e, setFormData, { email: 'Error' }, setErrors);
            expect(setErrors.getValue().email).toBe('');
        });

        it('no debe lanzar error si el evento es nulo', () => {
            expect(() =>
                window.CheckoutLogic.handleInputChange(null, mockSetState(), {}, mockSetState())
            ).not.toThrow();
        });
    });

    /* ------------------------------------------------------------------
     * 🔹 Tests para validateForm
     * ------------------------------------------------------------------ */
    describe('validateForm', () => {
        it('debe retornar true si todos los campos son válidos', () => {
            const formData = {
                nombre: 'Juan',
                apellido: 'Pérez',
                email: 'a@a.com',
                fono: '12345',
                direccion: 'Calle 1',
                comuna: 'Centro',
            };
            const result = window.CheckoutLogic.validateForm(formData, () => {});
            expect(result).toBeTrue();
        });

        it('debe retornar false si falta un campo requerido', () => {
            const formData = { nombre: '', apellido: '', email: '', fono: '', direccion: '', comuna: '' };
            const result = window.CheckoutLogic.validateForm(formData, () => {});
            expect(result).toBeFalse();
        });

        it('debe llenar el objeto de errores correctamente', () => {
            const setErrors = jasmine.createSpy('setErrors');
            const formData = { nombre: '', apellido: '', email: '', fono: '', direccion: '', comuna: '' };
            window.CheckoutLogic.validateForm(formData, setErrors);
            expect(setErrors).toHaveBeenCalled();
        });
    });

    /* ------------------------------------------------------------------
     * 🔹 Tests para handleSubmit
     * ------------------------------------------------------------------ */
    describe('handleSubmit', () => {
        it('debe guardar los datos en localStorage y navegar si es válido', () => {
            const navigate = jasmine.createSpy('navigate');
            const updateUser = jasmine.createSpy('updateUser');
            const formData = {
                nombre: 'Juan',
                apellido: 'Pérez',
                email: 'a@a.com',
                fono: '12345',
                direccion: 'Calle 1',
                comuna: 'Centro',
            };
            spyOn(window.localStorage, 'setItem');

            const result = window.CheckoutLogic.handleSubmit(
                { preventDefault: () => {} },
                formData,
                true,
                true,
                updateUser,
                navigate,
                window.CheckoutLogic.validateForm,
                () => {}
            );

            expect(result).toBeTrue();
            expect(window.localStorage.setItem).toHaveBeenCalled();
            expect(navigate).toHaveBeenCalledWith('/resumen-pedido');
        });

        it('no debe continuar si la validación falla', () => {
            const navigate = jasmine.createSpy('navigate');
            const result = window.CheckoutLogic.handleSubmit(
                { preventDefault: () => {} },
                {},
                false,
                false,
                () => {},
                navigate,
                () => false,
                () => {}
            );
            expect(result).toBeFalse();
            expect(navigate).not.toHaveBeenCalled();
        });

        it('debe manejar errores de localStorage sin romper', () => {
            spyOn(window.localStorage, 'setItem').and.throwError('Storage error');
            const navigate = jasmine.createSpy('navigate');
            const formData = {
                nombre: 'Test',
                apellido: 'User',
                email: 'a@a.com',
                fono: '111',
                direccion: 'Dir',
                comuna: 'Com',
            };
            const result = window.CheckoutLogic.handleSubmit(
                { preventDefault: () => {} },
                formData,
                false,
                false,
                () => {},
                navigate,
                () => true,
                () => {}
            );
            expect(result).toBeTrue();
        });
    });
});
