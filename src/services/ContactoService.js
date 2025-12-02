import axios from "axios";

const BASE_URL = "http://localhost:8080/api/contacto"; // misma ruta del backend

export async function enviarContacto(contactoData) {
  console.log("Enviando contacto al backend:", contactoData);
  const response = await axios.post(`${BASE_URL}/crear`, contactoData);
  return response.data;
}

//obtener todos los mensajes de contacto
export async function getContactos() {
  const response = await axios.get(BASE_URL);
  return response.data;
}

//eliminar un mensaje por ID
export async function deleteContacto(id) {
  await axios.delete(`${BASE_URL}/eliminar/${id}`);
}
