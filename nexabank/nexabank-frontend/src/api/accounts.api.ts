import { api } from "./client";

export interface AccountResponse {
  id: string;
  type: string;
  currency: string;
  name: string;
  balance: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function getAccounts() {
  const response =
    await api.get<AccountResponse[]>("/accounts");

  return response.data;
}
