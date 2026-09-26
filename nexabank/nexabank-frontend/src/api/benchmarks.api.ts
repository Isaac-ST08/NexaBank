import { api } from "./client";

export interface BenchmarkRun {
  id: string;
  framework: string;
  javaVersion: string;
  executedAt: string;
  datasetSource: string;
  datasetSize: number;
  status: string;
}

export interface BenchmarkResult {
  id: string;
  runId: string;
  algorithm: string;
  operation: string;
  inputSize: number;
  score: number;
  scoreError: number;
  unit: string;
}

export async function getBenchmarkRuns() {
  const response =
    await api.get<BenchmarkRun[]>("/benchmarks");

  return response.data;
}

export async function getBenchmarkResults(
  runId: string
) {
  const response =
    await api.get<BenchmarkResult[]>(
      `/benchmarks/${runId}/results`
    );

  return response.data;
}

export async function executeBenchmark(
  inputSize = 1000
) {
  const response =
    await api.post<BenchmarkRun>(
      "/benchmarks/execute",
      null,
      {
        params: {
          inputSize
        }
      }
    );

  return response.data;
}
