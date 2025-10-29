// src/utils/Header.logic.spec.js
// Usamos window.HeaderLogic directamente (sin destructuring) para evitar redeclaraciones.
import '../utils/Header.logic.js'; // <-- Importa la lógica antes de usarla

describe('Header.logic', function () {
  var logic = window.HeaderLogic;

  // --------------------------------
  // computeDisplayName(...)
  // --------------------------------
  describe('computeDisplayName', function () {
    it('usa user.nombre si existe (válido)', function () {
      var u = { nombre: 'Aurora', email: 'a@x.com' };
      expect(logic.computeDisplayName(u)).toBe('Aurora');
    });

    it('cae en email local-part si no hay nombre/name/username (válido)', function () {
      var u = { email: 'mi_usuario@dominio.com' };
      expect(logic.computeDisplayName(u)).toBe('mi_usuario');
    });

    it('retorna "Mi cuenta" para entradas inválidas (borde)', function () {
      expect(logic.computeDisplayName(null)).toBe('Mi cuenta');
      expect(logic.computeDisplayName({})).toBe('Mi cuenta');
      expect(logic.computeDisplayName({ email: 'sin-arroba' })).toBe('Mi cuenta');
    });

    it('respeta prioridad: nombre > name > username (válido)', function () {
      expect(logic.computeDisplayName({ nombre: 'N', name: 'M', username: 'U' })).toBe('N');
      expect(logic.computeDisplayName({ name: 'M', username: 'U' })).toBe('M');
      expect(logic.computeDisplayName({ username: 'U' })).toBe('U');
    });
  });

  // --------------------------------
  // toggleMenuState(...)
  // --------------------------------
  describe('toggleMenuState', function () {
    it('invierte true->false (válido)', function () {
      expect(logic.toggleMenuState(true)).toBe(false);
    });

    it('invierte false->true (válido)', function () {
      expect(logic.toggleMenuState(false)).toBe(true);
    });

    it('si entrada inválida, trata como false y devuelve true (borde)', function () {
      expect(logic.toggleMenuState(null)).toBe(true);
    });
  });

  // --------------------------------
  // shouldCloseOnDocumentMouseDown(...)
  // --------------------------------
  describe('shouldCloseOnDocumentMouseDown', function () {
    it('retorna true si el click fue fuera del menú (válido)', function () {
      var menu = { contains: function (t) { return t === 'inside'; } };
      var target = 'outside';
      expect(logic.shouldCloseOnDocumentMouseDown(target, menu)).toBe(true);
    });

    it('retorna false si el click fue dentro del menú (válido)', function () {
      var menu = { contains: function (t) { return t === 'inside'; } };
      var target = 'inside';
      expect(logic.shouldCloseOnDocumentMouseDown(target, menu)).toBe(false);
    });

    it('retorna false si no hay menuElement válido (borde)', function () {
      expect(logic.shouldCloseOnDocumentMouseDown('x', null)).toBe(false);
      expect(logic.shouldCloseOnDocumentMouseDown('x', {})).toBe(false);
    });
  });

  // --------------------------------
  // handleLogout(...)
  // --------------------------------
  describe('handleLogout', function () {
    it('ejecuta logout y navega a "/" (válido)', function () {
      var calledLogout = 0;
      var path = null;
      function logoutFn() { calledLogout++; }
      function navigateFn(p) { path = p; }
      var ok = logic.handleLogout(logoutFn, navigateFn);
      expect(ok).toBe(true);
      expect(calledLogout).toBe(1);
      expect(path).toBe('/');
    });

    it('retorna false si logoutFn no es función (incorrecto)', function () {
      var ok = logic.handleLogout(null, function () {});
      expect(ok).toBe(false);
    });

    it('retorna false si logoutFn lanza (borde)', function () {
      function badLogout() { throw new Error('x'); }
      var ok = logic.handleLogout(badLogout, function () {});
      expect(ok).toBe(false);
    });
  });
});
