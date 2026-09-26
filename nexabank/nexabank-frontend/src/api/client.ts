import axios from "axios";

export const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8080/api/v1";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Enviamos el ID token de Firebase en cada petición privada.
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("nexabank_token");

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("nexabank_token");
    }

    return Promise.reject(error);
  }
);
