import { api } from "./client";
import type { Transaction } from "../types";

export interface SortRequest {
  algorithm: "MERGE_SORT" | "QUICK_SORT";
  field: "amount" | "createdAt";
  order: "ASC" | "DESC";
}

export interface SortResult {
  algorithm: string;
  field: string;
  order: string;
  inputSize: number;
  executionTimeNanos: number;
  data: Transaction[];
}

export interface SearchResult {
  algorithm: string;
  target: string;
  found: boolean;
  position: number;
  executionTimeNanos: number;
}

export async function runSort(
  request: SortRequest
) {
  const response =
    await api.post<SortResult>(
      "/algorithms/sort",
      request
    );

  return response.data;
}

export async function binarySearch(
  value: string,
  field: "id" | "amount"
) {
  const response =
    await api.post<SearchResult>(
      "/algorithms/search",
      {
        algorithm: "BINARY_SEARCH",
        field,
        value
      }
    );

  return response.data;
}
