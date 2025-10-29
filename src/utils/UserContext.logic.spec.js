// src/utils/UserContext.logic.spec.js
// Pruebas Jasmine usando el namespace global sin destructurar para evitar redeclaraciones.
import '../utils/UserContext.logic.js';
describe('UserContext.logic', function () {
  var logic = window.UserContextLogic;

  // -----------------------------
  // loadInitialUser(...)
  // -----------------------------
  describe('loadInitialUser', function () {
    it('retorna el usuario cuando getUsuarioActualFn es válido (entrada válida)', function () {
      var user = { id: 1, nombre: 'Ana' };
      function getU() { return user; }
      var res = logic.loadInitialUser(getU);
      expect(res).toBe(user);
    });

    it('retorna null si getUsuarioActualFn no es función (entrada incorrecta)', function () {
      var res = logic.loadInitialUser(null);
      expect(res).toBeNull();
    });

    it('retorna null si getUsuarioActualFn lanza excepción (caso borde)', function () {
      function bad() { throw new Error('boom'); }
      var res = logic.loadInitialUser(bad);
      expect(res).toBeNull();
    });
  });

  // -----------------------------
  // loginUser(...)
  // -----------------------------
  describe('loginUser', function () {
    it('persiste el usuario cuando setUsuarioActualFn es válido (entrada válida)', function () {
      var calledWith = null;
      function setU(u) { calledWith = u; }
      var u = { id: 7, name: 'Bastián' };
      var res = logic.loginUser(u, setU);
      expect(res.user).toBe(u);
      expect(res.persisted).toBe(true);
      expect(calledWith).toBe(u);
    });

    it('no persiste si setUsuarioActualFn no es función (entrada incorrecta)', function () {
      var u = { id: 2 };
      var res = logic.loginUser(u, null);
      expect(res.user).toBe(u);
      expect(res.persisted).toBe(false);
    });

    it('retorna user=null si userData es nulo (caso borde)', function () {
      var res = logic.loginUser(null, function () {});
      expect(res.user).toBeNull();
      expect(res.persisted).toBe(false);
    });
  });

  // -----------------------------
  // logoutUser(...)
  // -----------------------------
  describe('logoutUser', function () {
    it('remueve "usuarioActual" del storage (entrada válida)', function () {
      var removedKey = null;
      var mockStorage = {
        removeItem: function (k) { removedKey = k; }
      };
      var ok = logic.logoutUser(mockStorage);
      expect(ok).toBe(true);
      expect(removedKey).toBe('usuarioActual');
    });

    it('retorna false si storage es inválido (entrada incorrecta)', function () {
      var ok = logic.logoutUser(null);
      expect(ok).toBe(false);
    });

    it('retorna false si removeItem lanza excepción (caso borde)', function () {
      var mockStorage = { removeItem: function () { throw new Error('x'); } };
      var ok = logic.logoutUser(mockStorage);
      expect(ok).toBe(false);
    });
  });

  // -----------------------------
  // buildUpdatedUser(...)
  // -----------------------------
  describe('buildUpdatedUser', function () {
    it('combina user + updatedData (entrada válida)', function () {
      var user = { id: 1, nombre: 'Ana', email: 'a@a.com' };
      var delta = { nombre: 'Ana María' };
      var out = logic.buildUpdatedUser(user, delta);
      expect(out.id).toBe(1);
      expect(out.nombre).toBe('Ana María');
      expect(out.email).toBe('a@a.com');
      expect(out).not.toBe(user); // nueva referencia
    });

    it('si user es nulo, retorna copia de updatedData (entrada nula)', function () {
      var delta = { id: 3, nombre: 'Carlos' };
      var out = logic.buildUpdatedUser(null, delta);
      expect(out.id).toBe(3);
      expect(out.nombre).toBe('Carlos');
    });

    it('si updatedData es inválido, retorna copia del user (caso borde)', function () {
      var user = { id: 1, nombre: 'Ana' };
      var out = logic.buildUpdatedUser(user, null);
      expect(out.id).toBe(1);
      expect(out.nombre).toBe('Ana');
      expect(out).not.toBe(user);
    });
  });

  // -----------------------------
  // updateUserList(...)
  // -----------------------------
  describe('updateUserList', function () {
    var lista;
    beforeEach(function () {
      lista = [
        { id: 1, nombre: 'A' },
        { id: 2, nombre: 'B' },
        { id: 3, nombre: 'C' }
      ];
    });

    it('reemplaza el usuario con id coincidente (entrada válida)', function () {
      var nuevo = { id: 2, nombre: 'Beatriz' };
      var out = logic.updateUserList(lista, nuevo);
      expect(out.length).toBe(3);
      expect(out[1]).toEqual(nuevo);
      expect(out[0]).toEqual(lista[0]);
      expect(out[2]).toEqual(lista[2]);
      expect(out).not.toBe(lista);
    });

    it('retorna copia si newUser no trae id (entrada incorrecta)', function () {
      var out = logic.updateUserList(lista, { nombre: 'X' });
      expect(out).toEqual(lista);
      expect(out).not.toBe(lista);
    });

    it('retorna [] si usuarios no es arreglo (caso borde)', function () {
      var out = logic.updateUserList(null, { id: 1 });
      expect(out).toEqual([]);
    });
  });

  // -----------------------------
  // persistUsuarios(...)
  // -----------------------------
  describe('persistUsuarios', function () {
    it('guarda JSON en storage (entrada válida)', function () {
      var saved = null;
      var mockStorage = {
        setItem: function (k, v) {
          if (k === 'usuarios') saved = v;
        }
      };
      var ok = logic.persistUsuarios([{ id: 1 }], mockStorage);
      expect(ok).toBe(true);
      expect(typeof saved).toBe('string');
      expect(saved.indexOf('"id":1') !== -1).toBe(true);
    });

    it('retorna false si storage inválido (entrada incorrecta)', function () {
      var ok = logic.persistUsuarios([{ id: 1 }], null);
      expect(ok).toBe(false);
    });

    it('retorna false si JSON.stringify falla (caso borde)', function () {
      var a = {};
      a.me = a; // circular
      var mockStorage = { setItem: function () {} };
      var ok = logic.persistUsuarios(a, mockStorage);
      expect(ok).toBe(false);
    });
  });

  // -----------------------------
  // getSyncUser(...) & handleStorageEvent(...)
  // -----------------------------
  describe('getSyncUser & handleStorageEvent', function () {
    it('getSyncUser devuelve el usuario usando getUsuarioActual (válido)', function () {
      function getU() { return { id: 9 }; }
      var u = logic.getSyncUser(getU);
      expect(u).toEqual({ id: 9 });
    });

    it('handleStorageEvent retorna undefined si key distinta (incorrecta)', function () {
      var out = logic.handleStorageEvent({ key: 'otra' }, function () { return { id: 1 }; });
      expect(out).toBeUndefined();
    });

    it('handleStorageEvent retorna el usuario si key es usuarioActual (borde positivo)', function () {
      function getU() { return { id: 5 }; }
      var out = logic.handleStorageEvent({ key: 'usuarioActual' }, getU);
      expect(out).toEqual({ id: 5 });
    });
  });

  // -----------------------------
  // addUserSyncListeners(...)
  // -----------------------------
  describe('addUserSyncListeners', function () {
    it('agrega y luego remueve listeners (entrada válida)', function () {
      var added = [];
      var removed = [];
      var win = {
        addEventListener: function (name, fn) { added.push(name); this._fn = fn; },
        removeEventListener: function (name) { removed.push(name); }
      };
      var called = 0;
      function syncFn() { called++; }

      var cleanup = logic.addUserSyncListeners(syncFn, win);
      expect(added.indexOf('usuarioActual:changed') !== -1).toBe(true);
      expect(added.indexOf('storage') !== -1).toBe(true);

      // llamar cleanup
      cleanup();
      expect(removed.indexOf('usuarioActual:changed') !== -1).toBe(true);
      expect(removed.indexOf('storage') !== -1).toBe(true);
    });

    it('si window inválido, retorna cleanup no-op (entrada incorrecta)', function () {
      var cleanup = logic.addUserSyncListeners(function () {}, null);
      expect(typeof cleanup).toBe('function');
      // no debe lanzar al ejecutar
      cleanup();
    });

    it('no falla si syncFn lanza (caso borde)', function () {
      var win = {
        addEventListener: function () {},
        removeEventListener: function () {}
      };
      var cleanup = logic.addUserSyncListeners(function () { throw new Error('x'); }, win);
      expect(typeof cleanup).toBe('function');
      cleanup();
    });
  });
});
