import { api } from "./client";
import type { BenchmarkPoint } from "../types";

// Obtiene los resultados de los benchmarks JMH.
export async function getBenchmarkResults(): Promise<
  BenchmarkPoint[]
> {

  const response =
    await api.get<BenchmarkPoint[]>(
      "/benchmarks/results"
    );

  return response.data;
}
