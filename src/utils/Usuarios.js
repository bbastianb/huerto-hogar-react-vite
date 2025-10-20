function leerJSONSeguro(key, fallback = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.warn(`Error al leer ${key} desde localStorage:`, err);
    return fallback;
  }
}

let listaUsuario = leerJSONSeguro("usuarios");
if (!listaUsuario) {
  listaUsuario = [
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
      id: 7,
      nombre: "Agustin",
      apellido: "Martinez",
      email: "agustin@gmail.com",
      contrasena: "999",
      fono: 949213626,
      direccion: "Pasaje alumbrado 123",
      comuna: "San Juan",
      tipo: "usuario",
    },
  ];
  localStorage.setItem("usuarios", JSON.stringify(listaUsuario));
}

export const getUsuarios = () =>
  JSON.parse(localStorage.getItem("usuarios")) || [];
export const setUsuarios = (arr) =>
  localStorage.setItem("usuarios", JSON.stringify(arr));
export const getUsuarioActual = () =>
  JSON.parse(localStorage.getItem("usuarioActual"));
export const setUsuarioActual = (u) =>
  localStorage.setItem("usuarioActual", JSON.stringify(u));
