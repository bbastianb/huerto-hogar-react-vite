import axios from "axios";
import { baseURLUsuario, axiosAuth } from "./api";

const baseURL = baseURLUsuario;

// PUT /api/usuario/actualizar-contrasenna  (público)
export const resetearContrasena = async (email, codigo, contrasennaNueva) => {
  const { data } = await axios.put(`${baseURL}/actualizar-contrasenna`, {
    email,
    codigo,
    contrasennaNueva,
  });
  return data; // "Contraseña actualizada correctamente."
};

// POST /api/usuario/recuperar-contrasenna (público)
export const solicitarCodigoRecuperacion = async (email) => {
  const { data } = await axios.post(`${baseURL}/recuperar-contrasenna`, {
    email,
  });
  return data;
};

// GET /api/usuario (SOLO ADMIN) → requiere token
export const getUsuarios = async () => {
  const { data } = await axiosAuth.get(baseURL);
  return data;
};

// POST /api/usuario/guardar (registro, público)
export const guardarUsuario = async (usuario) => {
  const { data } = await axios.post(`${baseURL}/guardar`, usuario);
  return data;
};

// DELETE /api/usuario/eliminar/{id} (SOLO ADMIN) → token
export const eliminarUsuario = async (id) => {
  const { data } = await axiosAuth.delete(`${baseURL}/eliminar/${id}`);
  return data;
};

// PUT /api/usuario/actualizar/{id} (SOLO ADMIN) → token
export const actualizarUsuario = async (id, usuario) => {
  const { data } = await axiosAuth.put(`${baseURL}/actualizar/${id}`, usuario);
  return data;
};

// GET /api/usuario/contar (SOLO ADMIN) → token
export const contarUsuarios = async () => {
  const { data } = await axiosAuth.get(`${baseURL}/contar`);
  return data;
};

// POST /api/usuario/login (público, pero aquí guardamos el token)
export const loginUsuario = async (email, contrasenna) => {
  const { data } = await axios.post(`${baseURL}/login`, {
    email,
    contrasenna,
  });

  // backend responde: { token, usuario }
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data.usuario;
};

// GET /api/usuario/buscar/{id} (SOLO ADMIN) → token
export const getUsuarioPorId = async (id) => {
  const { data } = await axiosAuth.get(`${baseURL}/buscar/${id}`);
  return data;
};
