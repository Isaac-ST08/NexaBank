import { api } from "./client";

// Función encargada de hacer el login.
// El backend debe responder con un token JWT.
export async function login(
  username: string,
  password: string
) {
  const response = await api.post<{ token: string }>(
    "/auth/login",
    {
      username,
      password
    }
  );

  return response.data;
}
