import axios from "axios";

const baseURL = "http://localhost:8080/api/usuario";

// PUT /api/usuario/actualizar-contrasenna
export const resetearContrasena = async (email, codigo, contrasennaNueva) => {
  const { data } = await axios.put(`${baseURL}/actualizar-contrasenna`, {
    email,
    codigo,
    contrasennaNueva,
  });
  return data; // "Contraseña actualizado correctamente."
};

// POST /api/usuario/recuperar-contrasenna
export const solicitarCodigoRecuperacion = async (email) => {
  const { data } = await axios.post(`${baseURL}/recuperar-contrasenna`, {
    email,
  });
  return data;
};

// GET /api/usuario
export const getUsuarios = async () => {
  const { data } = await axios.get(baseURL);
  return data;
};

// POST /api/usuario/guardar
export const guardarUsuario = async (usuario) => {
  const { data } = await axios.post(`${baseURL}/guardar`, usuario);
  return data;
};

// DELETE /api/usuario/eliminar/{id}
export const eliminarUsuario = async (id) => {
  const { data } = await axios.delete(`${baseURL}/eliminar/${id}`);
  return data;
};

// PUT /api/usuario/actualizar/{id}
export const actualizarUsuario = async (id, usuario) => {
  const { data } = await axios.put(`${baseURL}/actualizar/${id}`, usuario);
  return data;
};

// GET /api/usuario/contar
export const contarUsuarios = async () => {
  const { data } = await axios.get(`${baseURL}/contar`);
  return data;
};

// POST /api/usuario/login
export const loginUsuario = async (email, contrasenna) => {
  const { data } = await axios.post(`${baseURL}/login`, {
    email,
    contrasenna,
  });
  return data;
};
