(function () {
  "use strict";

  /** Normaliza un texto: colapsa espacios y trim. */
  function normalizarTexto(s) {
    if (typeof s !== "string") return "";
    return s.replace(/\s+/g, " ").trim();
  }

  /** Valida formato de email básico (mismo criterio que Login). */
  function validarFormatoEmail(email) {
    if (typeof email !== "string") return false;
    var e = email.trim();
    if (!e) return false;
    var rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return rx.test(e);
  }

  /** Valida que el string contenga solo letras (sin números). */
  function validarSoloLetras(texto) {
    var t = normalizarTexto(texto);
    if (!t) return false;
    return /^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+$/.test(t);
  }

  /**
   * Valida teléfono: al menos 9 dígitos (Chile comúnmente 9).
   * Acepta espacios/guiones pero requiere 9 dígitos reales.
   */
  function validarTelefono(telefono) {
    if (typeof telefono !== "string") return false;
    var digits = (telefono.match(/\d/g) || []).length;
    return digits >= 9;
  }

  /** Dirección debe contener letras y números (ej: "Calle 123"). */
  function validarDireccion(direccion) {
    var d = normalizarTexto(direccion);
    if (!d) return false;
    var tieneLetra = /[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(d);
    var tieneNumero = /\d/.test(d);
    return tieneLetra && tieneNumero;
  }

  /** Comuna solo letras. */
  function validarComuna(comuna) {
    return validarSoloLetras(comuna);
  }

  /** ¿Email disponible dentro de una lista de usuarios? */
  function emailDisponible(email, usuarios) {
    if (!Array.isArray(usuarios)) return false;
    if (!validarFormatoEmail(email)) return false;
    var objetivo = email.trim().toLowerCase();
    var existe = usuarios.some(function (u) {
      return (
        u &&
        typeof u.email === "string" &&
        u.email.trim().toLowerCase() === objetivo
      );
    });
    return !existe;
  }

  /** Genera un nuevo ID incremental seguro. */
  function generarNuevoId(usuarios) {
    if (!Array.isArray(usuarios) || usuarios.length === 0) return 1;
    var max = 0;
    for (var i = 0; i < usuarios.length; i++) {
      var n = Number(usuarios[i] && usuarios[i].id);
      if (!isNaN(n) && n > max) max = n;
    }
    return max + 1;
  }

  /** Construye el objeto usuario nuevo, con tipo = "usuario" y activo=true. */
  function construirUsuario(data, nuevoId) {
    return {
      id: nuevoId,
      nombre: normalizarTexto(data && data.nombre),
      apellido: normalizarTexto(data && data.apellido),
      email: normalizarTexto(data && data.email),
      contrasena: (data && data.contrasena) || "",
      telefono: (data && data.telefono) || "",
      direccion: normalizarTexto(data && data.direccion),
      comuna: normalizarTexto(data && data.comuna),
      tipo: "usuario",
      activo: true,
    };
  }

  function validarFormulario(data, usuariosExistentes) {
    var errors = {};
    if (!data || typeof data !== "object") {
      return { ok: false, errors: { global: "Formulario inválido." } };
    }

    var nombre = normalizarTexto(data.nombre);
    var apellido = normalizarTexto(data.apellido);
    var email = normalizarTexto(data.email);
    var contrasena = typeof data.contrasena === "string" ? data.contrasena : "";
    var recontrasena =
      typeof data.contrasenaConfirma === "string"
        ? data.contrasenaConfirma
        : "";
    var telefono = String(data.telefono || "");
    var direccion = normalizarTexto(data.direccion);
    var comuna = normalizarTexto(data.comuna);

    if (!validarSoloLetras(nombre))
      errors.nombre = "El nombre solo debe contener letras";
    if (!validarSoloLetras(apellido))
      errors.apellido = "El apellido solo debe contener letras";

    if (!validarFormatoEmail(email))
      errors.email = "Por favor, ingresa un formato de email válido.";
    else if (
      !emailDisponible(
        email,
        Array.isArray(usuariosExistentes) ? usuariosExistentes : []
      )
    )
      errors.email = "Este email ya está registrado";

    if (!contrasena || contrasena.length < 8)
      errors.contrasena = "La contraseña debe tener al menos 8 caracteres";
    if (contrasena !== recontrasena)
      errors.contrasenaConfirma = "Las contraseñas no coinciden";

    if (!validarTelefono(telefono))
      errors.telefono = "El teléfono debe tener al menos 9 dígitos";
    if (!validarDireccion(direccion))
      errors.direccion =
        "La dirección debe contener letras y números (ej: Calle 123)";
    if (!validarComuna(comuna))
      errors.comuna = "La comuna solo debe contener letras";

    var ok = Object.keys(errors).length === 0;
    return {
      ok: ok,
      errors: errors,
      dataNormalizada: ok
        ? {
            nombre: nombre,
            apellido: apellido,
            email: email,
            contrasena: contrasena,
            telefono: telefono,
            direccion: direccion,
            comuna: comuna,
          }
        : undefined,
    };
  }

  function registrarUsuario(data, usuariosExistentes) {
    var lista = Array.isArray(usuariosExistentes)
      ? usuariosExistentes.slice()
      : [];

    var v = validarFormulario(data, lista);
    if (!v.ok) return { ok: false, errors: v.errors };

    var nuevoId = generarNuevoId(lista);
    var nuevoUsuario = construirUsuario(v.dataNormalizada, nuevoId);

    // Seguridad extra: evita duplicados por condición de carrera
    if (!emailDisponible(nuevoUsuario.email, lista)) {
      return { ok: false, errors: { email: "Este email ya está registrado" } };
    }

    lista.push(nuevoUsuario);
    return {
      ok: true,
      lista: lista,
      usuario: nuevoUsuario,
      redirectPath: "/login",
    };
  }

  window.RegistroLogic = {
    // utilidades
    normalizarTexto,
    validarFormatoEmail,
    validarSoloLetras,
    validarTelefono,
    validarDireccion,
    validarComuna,
    emailDisponible,
    generarNuevoId,
    construirUsuario,
    // validación/flujo
    validarFormulario,
    registrarUsuario,
  };
})();
