// src/utils/Contacto.logic.spec.js
// Usamos window.ContactoLogic directamente (sin destructuración) para evitar redeclaraciones.
import '../utils/Contacto.logic.js'; 
describe('Contacto.logic', function () {
  var logic = window.ContactoLogic;

  // --------------------------------
  // updateForm(...)
  // --------------------------------
  describe('updateForm', function () {
    it('actualiza un campo sin mutar el objeto previo (válido)', function () {
      var prev = { nombre: 'Ana', email: 'a@a.cl', mensaje: 'hola' };
      var out = logic.updateForm(prev, 'nombre', 'Aurora');
      expect(out).toEqual({ nombre: 'Aurora', email: 'a@a.cl', mensaje: 'hola' });
      expect(out).not.toBe(prev);
    });

    it('si prevForm es inválido, parte desde {} (incorrecto)', function () {
      var out = logic.updateForm(null, 'email', 'x@y.com');
      expect(out).toEqual({ email: 'x@y.com' });
    });

    it('si name es vacío/incorrecto, retorna copia superficial (borde)', function () {
      var prev = { nombre: 'Ana' };
      var out = logic.updateForm(prev, '', 'x');
      expect(out).toEqual(prev);
      expect(out).not.toBe(prev);
    });
  });

  // --------------------------------
  // isValidEmail(...)
  // --------------------------------
  describe('isValidEmail', function () {
    it('valida emails simples correctos (válido)', function () {
      expect(logic.isValidEmail('user@example.com')).toBe(true);
      expect(logic.isValidEmail('a.b+c@dominio.co')).toBe(true);
    });

    it('rechaza valores no string o vacíos (incorrecto)', function () {
      expect(logic.isValidEmail(null)).toBe(false);
      expect(logic.isValidEmail('')).toBe(false);
    });

    it('rechaza formatos inválidos (borde)', function () {
      expect(logic.isValidEmail('sin-arroba')).toBe(false);
      expect(logic.isValidEmail('a@b')).toBe(false);
      expect(logic.isValidEmail('a@b.')).toBe(false);
    });
  });

  // --------------------------------
  // validateForm(...)
  // --------------------------------
  describe('validateForm', function () {
    it('retorna true cuando todos los campos son válidos (válido)', function () {
      var form = { nombre: 'Ana', email: 'ana@mail.com', mensaje: 'Hola' };
      expect(logic.validateForm(form)).toBe(true);
    });

    it('retorna false si falta algún campo (incorrecto)', function () {
      expect(logic.validateForm({ nombre: '', email: 'a@a.cl', mensaje: 'x' })).toBe(false);
      expect(logic.validateForm({ nombre: 'Ana', email: '', mensaje: 'x' })).toBe(false);
      expect(logic.validateForm({ nombre: 'Ana', email: 'a@a.cl', mensaje: '' })).toBe(false);
    });

    it('retorna false si el email es inválido (borde)', function () {
      var form = { nombre: 'Ana', email: 'sin-arroba', mensaje: 'Hola' };
      expect(logic.validateForm(form)).toBe(false);
    });
  });

  // --------------------------------
  // submitForm(...)
  // --------------------------------
  describe('submitForm', function () {
    it('llama preventDefault si existe y retorna true sin validador (válido)', function () {
      var prevented = false;
      var e = { preventDefault: function () { prevented = true; } };
      var ok = logic.submitForm(e, { nombre: 'A' });
      expect(prevented).toBe(true);
      expect(ok).toBe(true);
    });

    it('usa validateFn cuando se provee y respeta su resultado (válido)', function () {
      var form = { nombre: 'Ana', email: 'ana@mail.com', mensaje: 'Hola' };
      var ok1 = logic.submitForm(null, form, function (f) { return true; });
      var ok2 = logic.submitForm(null, form, function (f) { return false; });
      expect(ok1).toBe(true);
      expect(ok2).toBe(false);
    });

    it('retorna false si validateFn lanza excepción (borde)', function () {
      var bad = function () { throw new Error('x'); };
      var ok = logic.submitForm(null, { }, bad);
      expect(ok).toBe(false);
    });
  });

  // --------------------------------
  // computeThanksName(...)
  // --------------------------------
  describe('computeThanksName', function () {
    it('retorna el nombre cuando existe (válido)', function () {
      var form = { nombre: 'Aurora' };
      expect(logic.computeThanksName(form)).toBe('Aurora');
    });

    it('retorna "amiga/o" cuando no hay nombre (incorrecto)', function () {
      var form = { nombre: '' };
      expect(logic.computeThanksName(form)).toBe('amiga/o');
    });

    it('trimea espacios y decide correctamente (borde)', function () {
      var form = { nombre: '   ' };
      expect(logic.computeThanksName(form)).toBe('amiga/o');
    });
  });
});
