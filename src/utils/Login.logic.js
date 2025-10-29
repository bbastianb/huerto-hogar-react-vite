(function () {
  "use strict";

  /**
   * Valida formato básico de email.
   * - Rechaza null/undefined/no-string
   * - Trim antes de validar
   */
  function validarFormatoEmail(email) {
    if (typeof email !== "string") return false;
    const e = email.trim();
    if (!e) return false;
    // Suficiente para casos comunes y unit tests
    const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return rx.test(e);
  }

  /**
   * Busca un usuario por email (case-insensitive).
   * Reglas:
   * - Si usuarios no es array o está vacío → null
   * - Si email no es string/está vacío → null
   * - Si no encuentra coincidencia → null
   */
  function encontrarUsuarioValido(email, usuarios) {
    if (!Array.isArray(usuarios) || usuarios.length === 0) return null;
    if (typeof email !== "string" || !email.trim()) return null;

    const objetivo = email.trim().toLowerCase();

    // Filtra entradas inválidas y compara en minúsculas con trim
    const encontrado =
      usuarios.find(
        (u) =>
          u &&
          typeof u.email === "string" &&
          u.email.trim().toLowerCase() === objetivo
      ) || null;

    return encontrado;
  }

  function autenticarUsuario(email, contrasena, usuarios) {
    // 1) Validar formato de email
    if (!validarFormatoEmail(email)) {
      return {
        success: false,
        error: "Por favor, ingresa un formato de email válido.",
      };
    }

    // 2) Encontrar usuario por email
    const usuario = encontrarUsuarioValido(email, usuarios);
    if (!usuario || usuario.contrasena !== contrasena) {
      return { success: false, error: "Email o contraseña incorrectos" };
    }

    const redirectPath = usuario.tipo === "admin" ? "/admin" : "/";

    return {
      success: true,
      error: "",
      usuario: { ...usuario },
      redirectPath,
    };
  }

  window.LoginLogic = {
    validarFormatoEmail,
    encontrarUsuarioValido,
    autenticarUsuario,
  };
})();
