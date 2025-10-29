import "../utils/Login.logic.js";

describe("LoginLogic", function () {
  "use strict";

  var mockUsuarios;

  beforeEach(function () {
    mockUsuarios = [
      {
        id: 1,
        nombre: "Juan Pérez",
        apellido: "Gómez",
        email: "juan@example.com",
        contrasena: "password123",
        tipo: "user",
      },
      {
        id: 2,
        nombre: "María López",
        apellido: "Rodríguez",
        email: "maria@example.com",
        contrasena: "password456",
        tipo: "admin",
      },
      {
        id: 3,
        nombre: "Carlos García",
        apellido: "Martínez",
        email: "carlos@example.com",
        contrasena: "password789",
        tipo: "user",
      },
    ];
  });

  describe("validarFormatoEmail", function () {
    it("debe retornar true para email válido", function () {
      var resultado = window.LoginLogic.validarFormatoEmail("test@example.com");
      expect(resultado).toBe(true);
    });

    it("debe retornar false para email sin @", function () {
      var resultado = window.LoginLogic.validarFormatoEmail("testexample.com");
      expect(resultado).toBe(false);
    });

    it("debe retornar false para email sin dominio", function () {
      var resultado = window.LoginLogic.validarFormatoEmail("test@");
      expect(resultado).toBe(false);
    });

    it("debe retornar false para email sin usuario", function () {
      var resultado = window.LoginLogic.validarFormatoEmail("@example.com");
      expect(resultado).toBe(false);
    });

    it("debe retornar false para email con espacios", function () {
      var resultado =
        window.LoginLogic.validarFormatoEmail("test @example.com");
      expect(resultado).toBe(false);
    });

    it("debe retornar false para string vacío", function () {
      var resultado = window.LoginLogic.validarFormatoEmail("");
      expect(resultado).toBe(false);
    });

    it("debe retornar false para null", function () {
      var resultado = window.LoginLogic.validarFormatoEmail(null);
      expect(resultado).toBe(false);
    });
  });

  describe("encontrarUsuarioValido", function () {
    it("debe encontrar usuario por email exacto", function () {
      var resultado = window.LoginLogic.encontrarUsuarioValido(
        "juan@example.com",
        mockUsuarios
      );
      expect(resultado).toBeDefined();
      expect(resultado.nombre).toBe("Juan Pérez");
      expect(resultado.email).toBe("juan@example.com");
    });

    it("debe encontrar usuario por email (case insensitive)", function () {
      var resultado = window.LoginLogic.encontrarUsuarioValido(
        "JUAN@example.com",
        mockUsuarios
      );
      expect(resultado).toBeDefined();
      expect(resultado.nombre).toBe("Juan Pérez");
    });

    it("debe retornar null si el email no existe", function () {
      var resultado = window.LoginLogic.encontrarUsuarioValido(
        "noexiste@example.com",
        mockUsuarios
      );
      expect(resultado).toBeNull();
    });

    it("debe retornar null si la lista de usuarios está vacía", function () {
      var resultado = window.LoginLogic.encontrarUsuarioValido(
        "juan@example.com",
        []
      );
      expect(resultado).toBeNull();
    });

    it("debe retornar null si usuarios es null", function () {
      var resultado = window.LoginLogic.encontrarUsuarioValido(
        "juan@example.com",
        null
      );
      expect(resultado).toBeNull();
    });

    it("debe retornar null si usuarios es undefined", function () {
      var resultado = window.LoginLogic.encontrarUsuarioValido(
        "juan@example.com",
        undefined
      );
      expect(resultado).toBeNull();
    });

    it("debe manejar usuario sin email", function () {
      var usuariosConEmailFaltante = [
        { id: 1, nombre: "Test", contrasena: "pass" }, // sin email
      ];
      var resultado = window.LoginLogic.encontrarUsuarioValido(
        "test@example.com",
        usuariosConEmailFaltante
      );
      expect(resultado).toBeNull();
    });
  });

  describe("autenticarUsuario", function () {
    it("debe autenticar usuario regular exitosamente", function () {
      var resultado = window.LoginLogic.autenticarUsuario(
        "juan@example.com",
        "password123",
        mockUsuarios
      );

      expect(resultado.success).toBe(true);
      expect(resultado.error).toBe("");
      expect(resultado.usuario.id).toBe(1);
      expect(resultado.usuario.nombre).toBe("Juan Pérez");
      expect(resultado.redirectPath).toBe("/");
    });

    it("debe autenticar admin exitosamente y redirigir a /admin", function () {
      var resultado = window.LoginLogic.autenticarUsuario(
        "maria@example.com",
        "password456",
        mockUsuarios
      );

      expect(resultado.success).toBe(true);
      expect(resultado.error).toBe("");
      expect(resultado.usuario.id).toBe(2);
      expect(resultado.usuario.nombre).toBe("María López");
      expect(resultado.redirectPath).toBe("/admin");
    });

    it("debe fallar con email inválido", function () {
      var resultado = window.LoginLogic.autenticarUsuario(
        "email-invalido",
        "password123",
        mockUsuarios
      );

      expect(resultado.success).toBe(false);
      expect(resultado.error).toBe(
        "Por favor, ingresa un formato de email válido."
      );
      expect(resultado.usuario).toBeUndefined();
      expect(resultado.redirectPath).toBeUndefined();
    });

    it("debe fallar con email no registrado", function () {
      var resultado = window.LoginLogic.autenticarUsuario(
        "noexiste@example.com",
        "password123",
        mockUsuarios
      );

      expect(resultado.success).toBe(false);
      expect(resultado.error).toBe("Email o contraseña incorrectos");
      expect(resultado.usuario).toBeUndefined();
    });

    it("debe fallar con contraseña incorrecta", function () {
      var resultado = window.LoginLogic.autenticarUsuario(
        "juan@example.com",
        "contrasena-incorrecta",
        mockUsuarios
      );

      expect(resultado.success).toBe(false);
      expect(resultado.error).toBe("Email o contraseña incorrectos");
      expect(resultado.usuario).toBeUndefined();
    });

    it("debe manejar lista de usuarios vacía", function () {
      var resultado = window.LoginLogic.autenticarUsuario(
        "juan@example.com",
        "password123",
        []
      );

      expect(resultado.success).toBe(false);
      expect(resultado.error).toBe("Email o contraseña incorrectos");
    });

    it("debe manejar usuarios null", function () {
      var resultado = window.LoginLogic.autenticarUsuario(
        "juan@example.com",
        "password123",
        null
      );

      expect(resultado.success).toBe(false);
      expect(resultado.error).toBe("Email o contraseña incorrectos");
    });

    it("debe manejar email case insensitive en autenticación", function () {
      var resultado = window.LoginLogic.autenticarUsuario(
        "JUAN@example.com",
        "password123",
        mockUsuarios
      );

      expect(resultado.success).toBe(true);
      expect(resultado.usuario.nombre).toBe("Juan Pérez");
    });

    it("debe preservar todos los datos del usuario en el resultado", function () {
      var resultado = window.LoginLogic.autenticarUsuario(
        "carlos@example.com",
        "password789",
        mockUsuarios
      );

      expect(resultado.success).toBe(true);
      expect(resultado.usuario.id).toBe(3);
      expect(resultado.usuario.nombre).toBe("Carlos García");
      expect(resultado.usuario.apellido).toBe("Martínez");
      expect(resultado.usuario.email).toBe("carlos@example.com");
      expect(resultado.usuario.tipo).toBe("user");
    });
  });

  describe("Integración completa", function () {
    it("debe seguir el flujo completo de autenticación exitosa", function () {
      // 1. Validar formato email
      var emailValido =
        window.LoginLogic.validarFormatoEmail("juan@example.com");
      expect(emailValido).toBe(true);

      // 2. Encontrar usuario
      var usuario = window.LoginLogic.encontrarUsuarioValido(
        "juan@example.com",
        mockUsuarios
      );
      expect(usuario).toBeDefined();

      // 3. Autenticar
      var authResult = window.LoginLogic.autenticarUsuario(
        "juan@example.com",
        "password123",
        mockUsuarios
      );

      expect(authResult.success).toBe(true);
      expect(authResult.redirectPath).toBe("/");
    });

    it("debe seguir el flujo completo de autenticación fallida", function () {
      // 1. Validar formato email
      var emailValido = window.LoginLogic.validarFormatoEmail("email-invalido");
      expect(emailValido).toBe(false);

      // 2. Autenticar (debe fallar en validación de formato)
      var authResult = window.LoginLogic.autenticarUsuario(
        "email-invalido",
        "password123",
        mockUsuarios
      );

      expect(authResult.success).toBe(false);
      expect(authResult.error).toContain("formato de email válido");
    });
  });
});
