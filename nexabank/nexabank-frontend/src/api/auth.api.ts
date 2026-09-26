import { api } from "./client";
import { loginWithFirebase } from "../firebase";

export async function login(
  email: string,
  password: string
) {
  await loginWithFirebase(email, password);

  // We call the backend after Firebase login.
  // This makes sure Spring Boot accepts the Firebase token.
  const response = await api.get("/auth/me");

  return response.data;
}
