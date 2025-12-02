import axios from "axios";

const baseURL = "http://localhost:8080/api/productos";

export const getProductos = async () => {
  const { data } = await axios.get(baseURL);
  return data;
};

export const getProductoPorId = async (id) => {
  const { data } = await axios.get(`${baseURL}/buscar/${id}`);
  return data;
};

export const crearProducto = async (producto) => {
  const { data } = await axios.post(`${baseURL}/crear`, producto);
  return data;
};

export const actualizarProducto = async (id, producto) => {
  const { data } = await axios.put(`${baseURL}/actualizar/${id}`, producto);
  return data;
};

export const eliminarProducto = async (id) => {
  await axios.delete(`${baseURL}/eliminar/${id}`);
};
