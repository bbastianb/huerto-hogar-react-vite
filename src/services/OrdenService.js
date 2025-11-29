import axios from "axios";

const baseURL = "http://localhost:8080/api/orden";

// POST /api/orden/guardar
export const crearOrden = async (orden) => {
  const { data } = await axios.post(`${baseURL}/guardar`, orden);
  return data;
};

// PUT /api/orden/actualizar-estado/{idOrden}
export const actualizarEstadoOrden = async (idOrden, estado) => {
  const { data } = await axios.put(`${baseURL}/actualizar-estado/${idOrden}`, {
    estado,
  });
  return data;
};

// DELETE /api/orden/eliminar/{idOrden}
export const eliminarOrden = async (idOrden) => {
  const { data } = await axios.delete(`${baseURL}/eliminar/${idOrden}`);
  return data;
};

// GET /api/orden
export const listarOrdenes = async () => {
  const { data } = await axios.get(baseURL);
  return data;
};

// GET /api/orden/contar
export const contarOrdenes = async () => {
  const { data } = await axios.get(`${baseURL}/contar`);
  return data;
};

// GET /api/orden/buscar/{id}
export const buscarOrden = async (id) => {
  const { data } = await axios.get(`${baseURL}/buscar/${id}`);
  return data;
};
