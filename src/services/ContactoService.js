import axios from "axios";

const BASE_URL = "http://localhost:8080/api/contacto"; // 👈 misma ruta del controller

export async function enviarContacto(contactoData) {
  console.log("Enviando contacto al backend:", contactoData);
  const response = await axios.post(BASE_URL, contactoData);
  return response.data;
}
