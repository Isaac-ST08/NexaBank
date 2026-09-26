import { api } from "./client";
import type {
  SortRequest,
  SortResult,
  Transaction
} from "../types";

// Ejecuta MergeSort o QuickSort en el backend.
export async function runSort(
  request: SortRequest
): Promise<SortResult> {

  const response =
    await api.post<SortResult>(
      "/algorithms/sort",
      request
    );

  return response.data;
}

// Ejecuta BinarySearch en el backend.
export async function binarySearch(
  target: string,
  field: string
) {

  const response =
    await api.post<Transaction[]>(
      "/algorithms/search",
      {
        target: target,
        field: field
      }
    );

  return response.data;
}
