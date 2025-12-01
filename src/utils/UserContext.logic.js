// src/utils/UserContext.logic.js
// Namespace global seguro para evitar redeclaraciones en Karma/Jasmine o recargas.
(function (global) {
  if (!global.UserContextLogic) {
    global.UserContextLogic = {};
  }
  var ns = global.UserContextLogic;

  /**
   * loadInitialUser(getUsuarioActualFn)
   * Lee de forma segura el usuario actual desde tu fuente (localStorage/util).
   * @param {Function} getUsuarioActualFn - función que retorna el usuario o null.
   * @returns {any|null} usuario o null si no hay/si falla.
   */
  ns.loadInitialUser = function loadInitialUser(getUsuarioActualFn) {
    try {
      if (typeof getUsuarioActualFn !== "function") return null;
      var u = getUsuarioActualFn();
      return u || null;
    } catch (_) {
      return null;
    }
  };

  /**
   * loginUser(userData, setUsuarioActualFn)
   * Persiste el usuario (si la función existe) y retorna un objeto con el resultado.
   * @param {any} userData
   * @param {Function} setUsuarioActualFn - función que persiste el usuario (opcional).
   * @returns {{user:any|null, persisted:boolean}}
   */
  ns.loginUser = function loginUser(userData, setUsuarioActualFn) {
    if (userData == null) return { user: null, persisted: false };
    var persisted = false;
    try {
      if (typeof setUsuarioActualFn === "function") {
        setUsuarioActualFn(userData);
        persisted = true;
      }
    } catch (_) {
      persisted = false;
    }
    return { user: userData, persisted: persisted };
  };

  /**
   * logoutUser(storage)
   * Elimina la clave 'usuarioActual' del storage (inyectable para tests).
   * @param {{removeItem:Function}=} storage - por defecto intenta usar window.localStorage
   * @returns {boolean} true si se pudo eliminar; false en caso contrario.
   */
  ns.logoutUser = function logoutUser(storage) {
    // Sin fallback: si no recibimos un storage válido, retornamos false.
    if (!storage || typeof storage.removeItem !== "function") return false;
    try {
      storage.removeItem("usuarioActual");
      return true;
    } catch (_) {
      return false;
    }
  };

  /**
   * buildUpdatedUser(user, updatedData)
   * Devuelve un nuevo objeto usuario combinando el actual con los cambios.
   * @param {any} user
   * @param {Object} updatedData
   * @returns {Object} nuevo usuario combinado (copia superficial).
   */
  ns.buildUpdatedUser = function buildUpdatedUser(user, updatedData) {
    var base = user && typeof user === "object" ? user : {};
    var delta =
      updatedData && typeof updatedData === "object" ? updatedData : {};
    // copia superficial para no mutar referencias
    var out = {};
    // merge base
    for (var k in base)
      if (Object.prototype.hasOwnProperty.call(base, k)) out[k] = base[k];
    // merge delta
    for (var k2 in delta)
      if (Object.prototype.hasOwnProperty.call(delta, k2)) out[k2] = delta[k2];
    return out;
  };

  /**
   * updateUserList(usuarios, newUser)
   * Reemplaza en la lista el usuario que tenga el mismo id que newUser.id.
   * Si no es arreglo válido, retorna [] de forma segura.
   * @param {Array} usuarios
   * @param {Object} newUser - debe traer {id}
   * @returns {Array} lista actualizada (misma longitud).
   */
  ns.updateUserList = function updateUserList(usuarios, newUser) {
    if (!Array.isArray(usuarios)) return [];
    if (!newUser || newUser.id == null) return usuarios.slice();
    var id = newUser.id;
    var out = new Array(usuarios.length);
    for (var i = 0; i < usuarios.length; i++) {
      var u = usuarios[i];
      out[i] = u && u.id === id ? newUser : u;
    }
    return out;
  };

  /**
   * persistUsuarios(usuarios, storage)
   * Guarda la lista de usuarios como JSON bajo la clave 'usuarios'.
   * @param {Array} usuarios
   * @param {{setItem:Function}=} storage - por defecto window.localStorage
   * @returns {boolean} true si se guardó; false si falla.
   */
  ns.persistUsuarios = function persistUsuarios(usuarios, storage) {
    // Sin fallback: si no recibimos un storage válido, retornamos false.
    if (!storage || typeof storage.setItem !== "function") return false;
    try {
      // Serializa exactamente lo que nos pasan.
      // Si usuarios es circular o no serializable, JSON.stringify lanzará
      // y retornaremos false, como esperan los tests.
      var json = JSON.stringify(usuarios);
      storage.setItem("usuarios", json);
      return true;
    } catch (_) {
      return false;
    }
  };

  /**
   * getSyncUser(getUsuarioActualFn)
   * Obtiene (sin efectos secundarios) el usuario actual para sincronizar el contexto.
   * @param {Function} getUsuarioActualFn
   * @returns {any|null}
   */
  ns.getSyncUser = function getSyncUser(getUsuarioActualFn) {
    return ns.loadInitialUser(getUsuarioActualFn);
  };

  /**
   * handleStorageEvent(e, getUsuarioActualFn)
   * Procesa un evento 'storage' y, si la key es 'usuarioActual', retorna el usuario.
   * En otro caso retorna undefined para indicar "ignorar".
   * @param {StorageEvent|Object} e - objeto con { key }
   * @param {Function} getUsuarioActualFn
   * @returns {any|undefined} usuario o undefined si no aplica.
   */
  ns.handleStorageEvent = function handleStorageEvent(e, getUsuarioActualFn) {
    if (!e || e.key !== "usuarioActual") return undefined;
    return ns.getSyncUser(getUsuarioActualFn);
  };

  /**
   * addUserSyncListeners(syncFn, win)
   * Agrega listeners para sincronizar usuario:
   *  - 'usuarioActual:changed' (custom)
   *  - 'storage' (nativo del navegador) filtrado a la clave 'usuarioActual' por el caller
   * Retorna una función de cleanup que los quita.
   * @param {Function} syncFn - callback sin args que sincroniza estado (p.ej., setUser(getSyncUser(...)))
   * @param {Window=} win - inyectable para tests (por defecto window)
   * @returns {Function} cleanup remover
   */
  ns.addUserSyncListeners = function addUserSyncListeners(syncFn, win) {
    var w = win || global;
    if (
      !w ||
      typeof w.addEventListener !== "function" ||
      typeof w.removeEventListener !== "function"
    ) {
      return function () {};
    }
    var customHandler = function () {
      try {
        syncFn && syncFn();
      } catch (_) {}
    };
    var storageHandler = function (e) {
      try {
        syncFn && syncFn(e);
      } catch (_) {}
    };
    w.addEventListener("usuarioActual:changed", customHandler);
    w.addEventListener("storage", storageHandler);

    return function cleanup() {
      try {
        w.removeEventListener("usuarioActual:changed", customHandler);
      } catch (_) {}
      try {
        w.removeEventListener("storage", storageHandler);
      } catch (_) {}
    };
  };
})(window);
