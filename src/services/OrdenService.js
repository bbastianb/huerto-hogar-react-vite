import { axiosAuth, baseURLOrden } from "./api";

const baseURL = baseURLOrden;

// POST /api/orden/guardar  (ROLE_usuario)
export const crearOrden = async (orden) => {
  const { data } = await axiosAuth.post(`${baseURL}/guardar`, orden);
  return data;
};

// PUT /api/orden/actualizar-estado/{idOrden}  (ROLE_admin)
export const actualizarEstadoOrden = async (idOrden, estado) => {
  const { data } = await axiosAuth.put(
    `${baseURL}/actualizar-estado/${idOrden}`,
    { estado }
  );
  return data;
};

// DELETE /api/orden/eliminar/{idOrden}  (ROLE_admin)
export const eliminarOrden = async (idOrden) => {
  const { data } = await axiosAuth.delete(`${baseURL}/eliminar/${idOrden}`);
  return data;
};

// GET /api/orden  (ROLE_admin)
export const listarOrdenes = async () => {
  const { data } = await axiosAuth.get(baseURL);
  return data;
};

// GET /api/orden/contar  (ROLE_admin)
export const contarOrdenes = async () => {
  const { data } = await axiosAuth.get(`${baseURL}/contar`);
  return data;
};

// GET /api/orden/buscar/{id}  (ROLE_admin)
export const buscarOrden = async (id) => {
  const { data } = await axiosAuth.get(`${baseURL}/buscar/${id}`);
  return data;
};

// GET /api/orden/usuario/{idUsuario}
export const getOrdenesPorUsuario = async (idUsuario) => {
  const { data } = await axiosAuth.get(`${baseURL}/usuario/${idUsuario}`);
  return data;
};
