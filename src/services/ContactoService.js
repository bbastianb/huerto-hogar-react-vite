import axios from "axios";
import { axiosAuth } from "./api"; // axios con token

const BASE_URL = "http://localhost:8080/api/contacto";

// POST /api/contacto/crear  (público, sin token)
export async function enviarContacto(contactoData) {
  console.log("Enviando contacto al backend:", contactoData);
  const response = await axios.post(`${BASE_URL}/crear`, contactoData);
  return response.data;
}

// GET /api/contacto
export async function getContactos() {
  const response = await axiosAuth.get(BASE_URL);
  return response.data;
}

// DELETE /api/contacto/eliminar/{id} / SOLO ADMIN
export async function deleteContacto(id) {
  const response = await axiosAuth.delete(`${BASE_URL}/eliminar/${id}`);
  return response.data;
}
