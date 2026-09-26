import { api } from "./client";
import type { Transaction } from "../types";

// Obtiene las transacciones desde Spring Boot.
export async function getTransactions(
  params?: {
    page?: number;
    size?: number;
    sort?: string;
  }
) {
  const response = await api.get<Transaction[]>(
    "/transactions",
    {
      params: params
    }
  );

  return response.data;
}
