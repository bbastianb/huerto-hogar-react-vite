import axios from "axios";
import { axiosAuth, baseURLProducto } from "./api";

const baseURL = baseURLProducto;

// GET públicos
export const getProductos = async () => {
  const { data } = await axios.get(baseURL);
  return data;
};

export const getProductoPorId = async (id) => {
  const { data } = await axios.get(`${baseURL}/buscar/${id}`);
  return data;
};

// ADMIN (necesitan token)
export const crearProducto = async (producto) => {
  const { data } = await axiosAuth.post(`${baseURL}/crear`, producto);
  return data;
};

export const actualizarProducto = async (id, producto) => {
  const { data } = await axiosAuth.put(`${baseURL}/actualizar/${id}`, producto);
  return data;
};

export const eliminarProducto = async (id) => {
  await axiosAuth.delete(`${baseURL}/eliminar/${id}`);
};
