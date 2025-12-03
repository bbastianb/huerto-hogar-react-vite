import axios from "axios";

export const baseURLUsuario = "http://localhost:8080/api/usuario";
export const baseURLOrden = "http://localhost:8080/api/orden";
export const baseURLProducto = "http://localhost:8080/api/productos";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const axiosAuth = axios.create();

axiosAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
