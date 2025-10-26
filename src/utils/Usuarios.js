function leerJSONSeguro(key, fallback = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.warn(`Error al leer ${key} desde localStorage:`, err);
    return fallback;
  }
}

export const getUsuarios = () => {
  const usuariosGuardados = leerJSONSeguro("usuarios");

  if (!usuariosGuardados) {
    const usuariosIniciales = [
      {
        id: 1,
        nombre: "Carlos",
        apellido: "Perez",
        email: "admin@gmail.com",
        contrasena: "1",
        fono: 959213526,
        direccion: "Calle Falsa 123",
        comuna: "Santiago",
        tipo: "admin",
      },
      {
        id: 2,
        nombre: "Juan",
        apellido: "Lopez",
        email: "juan@gmail.com",
        contrasena: "123",
        fono: 949213526,
        direccion: "Calle Loca 123",
        comuna: "Conchali",
        tipo: "usuario",
      },
      {
        id: 3,
        nombre: "Maria",
        apellido: "Rodriguez",
        email: "maria@gmail.com",
        contrasena: "456",
        fono: 999213526,
        direccion: "Calle Piola 123",
        comuna: "Talagante",
        tipo: "usuario",
      },
      {
        id: 4,
        nombre: "Pedro",
        apellido: "Perez",
        email: "pedro@gmail.com",
        contrasena: "999",
        fono: 919213526,
        direccion: "Calle Verde 123",
        comuna: "Independencia",
        tipo: "admin",
      },
      {
        id: 5,
        nombre: "Claudio",
        apellido: "Gonzalez",
        email: "claudio@gmail.com",
        contrasena: "999",
        fono: 945213526,
        direccion: "Calle Alameda 123",
        comuna: "Providencia",
        tipo: "usuario",
      },
      {
        id: 6,
        nombre: "Agustin",
        apellido: "Martinez",
        email: "agustin@gmail.com",
        contrasena: "999",
        fono: 949213626,
        direccion: "Pasaje alumbrado 123",
        comuna: "San Juan",
        tipo: "admin",
      },
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
    return usuariosIniciales;
  }

  return usuariosGuardados;
};

export const setUsuarios = (arr) => {
  localStorage.setItem("usuarios", JSON.stringify(arr));
};

export const getUsuarioActual = () => {
  return leerJSONSeguro("usuarioActual");
};

export const setUsuarioActual = (u) => {
    if (u) {
      localStorage.setItem("usuarioActual", JSON.stringify(u));
    } else {
      localStorage.removeItem("usuarioActual");
    }
    // 🔔 Avisar a la app (misma pestaña) que cambió el usuario
    window.dispatchEvent(new Event("usuarioActual:changed"));
  };


