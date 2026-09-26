import { api } from "./client";

export interface TransactionResponse {
  id: string;
  accountId: string;
  type: "INCOME" | "EXPENSE" | "TRANSFER";
  category: string;
  amount: number;
  currency: string;
  description: string;
  status: "COMPLETED" | "PENDING" | "FAILED" | "CANCELLED";
  timestamp: string;
  createdAt: string;
}

interface PageResponse<T> {
  data: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export async function getTransactions(
  page = 0,
  size = 100
) {
  const response =
    await api.get<PageResponse<TransactionResponse>>(
      "/transactions",
      {
        params: {
          page,
          size
        }
      }
    );

  return response.data;
}
