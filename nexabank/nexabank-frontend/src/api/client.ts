import axios from "axios";

// Dirección donde normalmente estará funcionando
// nuestro backend de Spring Boot.
export const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8080/api";

// Creamos una instancia de Axios para no repetir
// la dirección del backend en cada archivo.
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Antes de cada petición revisamos si tenemos
// un token guardado en el navegador.
api.interceptors.request.use((config) => {

  const token =
    localStorage.getItem("nexabank_token");

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});
