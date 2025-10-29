import "../utils/Registro.logic.js";

describe("RegistroLogic", function () {
  "use strict";

  var usuariosBase;

  beforeEach(function () {
    usuariosBase = [
      {
        id: 1,
        nombre: "Ana",
        apellido: "Pérez",
        email: "ana@example.com",
        contrasena: "secret111",
        tipo: "usuario",
        activo: true,
      },
      {
        id: 2,
        nombre: "Bastián",
        apellido: "Silva",
        email: "bastian@example.com",
        contrasena: "secret222",
        tipo: "admin",
        activo: true,
      },
    ];
  });

  // validarFormatoEmail
  describe("validarFormatoEmail", function () {
    it(" email válido", function () {
      var v = window.RegistroLogic.validarFormatoEmail("test@dom.com");
      expect(v).toBe(true);
    });
    it(" sin @", function () {
      var v = window.RegistroLogic.validarFormatoEmail("test.dom.com");
      expect(v).toBe(false);
    });
    it(" vacío/null", function () {
      expect(window.RegistroLogic.validarFormatoEmail("")).toBe(false);
      expect(window.RegistroLogic.validarFormatoEmail(null)).toBe(false);
    });
  });

  // validarSoloLetras
  describe("validarSoloLetras", function () {
    it(" solo letras", function () {
      expect(window.RegistroLogic.validarSoloLetras("María")).toBe(true);
    });
    it(" con números", function () {
      expect(window.RegistroLogic.validarSoloLetras("Jose1")).toBe(false);
    });
    it(" vacío/espacios", function () {
      expect(window.RegistroLogic.validarSoloLetras("   ")).toBe(false);
    });
  });

  // validarTelefono
  describe("validarTelefono", function () {
    it(" 9+ dígitos", function () {
      expect(window.RegistroLogic.validarTelefono("9 876 543 21")).toBe(true);
    });
    it(" menos de 9 dígitos", function () {
      expect(window.RegistroLogic.validarTelefono("12345678")).toBe(false);
    });
    it(" no-string", function () {
      expect(window.RegistroLogic.validarTelefono(null)).toBe(false);
    });
  });

  // validarDireccion
  describe("validarDireccion", function () {
    it(" contiene letras y números", function () {
      expect(
        window.RegistroLogic.validarDireccion("Calle Los Robles 123")
      ).toBe(true);
    });
    it(" solo letras", function () {
      expect(
        window.RegistroLogic.validarDireccion("Avenida Siempre Viva")
      ).toBe(false);
    });
    it(" vacío", function () {
      expect(window.RegistroLogic.validarDireccion("")).toBe(false);
    });
  });

  // validarComuna
  describe("validarComuna", function () {
    it(" solo letras", function () {
      expect(window.RegistroLogic.validarComuna("Maipú")).toBe(true);
    });
    it("con números", function () {
      expect(window.RegistroLogic.validarComuna("Santiago2")).toBe(false);
    });
    it("vacío", function () {
      expect(window.RegistroLogic.validarComuna("")).toBe(false);
    });
  });

  //  emailDisponible
  describe("emailDisponible", function () {
    it("true cuando el email no existe", function () {
      expect(
        window.RegistroLogic.emailDisponible("nuevo@example.com", usuariosBase)
      ).toBe(true);
    });
    it("false cuando ya existe (case-insensitive)", function () {
      expect(
        window.RegistroLogic.emailDisponible("ANA@EXAMPLE.COM", usuariosBase)
      ).toBe(false);
    });
    it("false si usuarios no es array o email inválido", function () {
      expect(
        window.RegistroLogic.emailDisponible("nuevo@example.com", null)
      ).toBe(false);
      expect(window.RegistroLogic.emailDisponible("mal", usuariosBase)).toBe(
        false
      );
    });
  });

  // generarNuevoId
  describe("generarNuevoId", function () {
    it("incremental +1 del máximo", function () {
      expect(window.RegistroLogic.generarNuevoId(usuariosBase)).toBe(3);
    });
    it("1 cuando la lista está vacía", function () {
      expect(window.RegistroLogic.generarNuevoId([])).toBe(1);
    });
    it("ignora ids no numéricos", function () {
      var lista = [{ id: "x" }, { id: 10 }];
      expect(window.RegistroLogic.generarNuevoId(lista)).toBe(11);
    });
  });

  // validarFormulario
  describe("validarFormulario", function () {
    it("ok con datos válidos", function () {
      var data = {
        nombre: "Juan",
        apellido: "Soto",
        email: "nuevo@ex.com",
        contrasena: "password9",
        contrasenaConfirma: "password9",
        telefono: "987654321",
        direccion: "Calle 123",
        comuna: "Recoleta",
      };
      var r = window.RegistroLogic.validarFormulario(data, usuariosBase);
      expect(r.ok).toBe(true);
      expect(r.errors).toEqual({});
      expect(r.dataNormalizada.email).toBe("nuevo@ex.com");
    });
    it("múltiples errores", function () {
      var data = {
        nombre: "Juan1",
        apellido: "",
        email: "mal",
        contrasena: "123",
        contrasenaConfirma: "456",
        telefono: "123",
        direccion: "SoloLetras",
        comuna: "Recoleta2",
      };
      var r = window.RegistroLogic.validarFormulario(data, usuariosBase);
      expect(r.ok).toBe(false);
      expect(Object.keys(r.errors).length).toBeGreaterThan(3);
      expect(r.errors.contrasenaConfirma).toBe("Las contraseñas no coinciden");
    });
    it("email duplicado", function () {
      var data = {
        nombre: "Ana",
        apellido: "Lopez",
        email: "ana@example.com",
        contrasena: "password9",
        contrasenaConfirma: "password9",
        telefono: "987654321",
        direccion: "Calle 123",
        comuna: "Ñuñoa",
      };
      var r = window.RegistroLogic.validarFormulario(data, usuariosBase);
      expect(r.ok).toBe(false);
      expect(r.errors.email).toBe("Este email ya está registrado");
    });
  });

  describe("registrarUsuario", function () {
    it("agrega usuario y entrega redirectPath=/login", function () {
      var data = {
        nombre: "Carla",
        apellido: "Ríos",
        email: "carla@example.com",
        contrasena: "pass1234",
        contrasenaConfirma: "pass1234",
        telefono: "987654321",
        direccion: "Pasaje 456",
        comuna: "Providencia",
      };
      var r = window.RegistroLogic.registrarUsuario(data, usuariosBase);
      expect(r.ok).toBe(true);
      expect(r.lista.length).toBe(3);
      expect(r.usuario.id).toBe(3);
      expect(r.redirectPath).toBe("/login");
    });
    it("no registra si el email ya existe", function () {
      var data = {
        nombre: "Ana",
        apellido: "Pérez",
        email: "ana@example.com",
        contrasena: "pass1234",
        contrasenaConfirma: "pass1234",
        telefono: "987654321",
        direccion: "Calle 789",
        comuna: "Las Condes",
      };
      var r = window.RegistroLogic.registrarUsuario(data, usuariosBase);
      expect(r.ok).toBe(false);
      expect(r.errors.email).toBe("Este email ya está registrado");
    });
    it("retorna errores si form es inválido", function () {
      var r = window.RegistroLogic.registrarUsuario(null, usuariosBase);
      expect(r.ok).toBe(false);
      expect(
        r.errors.global || r.errors.email || r.errors.nombre
      ).toBeDefined();
    });
  });
});
