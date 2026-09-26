import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import {
  BarChart3,
  Gauge
} from "lucide-react";

import {
  executeBenchmark,
  getBenchmarkResults,
  getBenchmarkRuns,
  type BenchmarkResult,
  type BenchmarkRun
} from "../api/benchmarks.api";

import {
  Button,
  Card,
  PageTitle
} from "../components/ui";

function BenchmarksPage() {
  const [runs, setRuns] =
    useState<BenchmarkRun[]>([]);

  const [results, setResults] =
    useState<BenchmarkResult[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [executing, setExecuting] =
    useState(false);

  async function loadBenchmarks() {
    try {
      const runsData =
        await getBenchmarkRuns();

      setRuns(runsData);

      if (runsData.length > 0) {
        const latestRun = runsData[0];

        const resultsData =
          await getBenchmarkResults(
            latestRun.id
          );

        setResults(resultsData);
      }
    } catch (error) {
      console.error(
        "No se pudieron cargar los benchmarks:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBenchmarks();
  }, []);

  async function runBenchmark() {
    setExecuting(true);

    try {
      await executeBenchmark(1000);
      await loadBenchmarks();
    } catch (error) {
      console.error(
        "No se pudo ejecutar el benchmark:",
        error
      );

      alert(
        "No se pudo ejecutar el benchmark."
      );
    } finally {
      setExecuting(false);
    }
  }

  const chartData = results.map(
    (result) => ({
      inputSize: result.inputSize,
      algorithm: result.algorithm,
      score: Number(
        (result.score / 1000000).toFixed(3)
      )
    })
  );

  return (
    <>
      <PageTitle
        title="Benchmarks"
        description="Resultados reales entregados por el backend."
        action={
          <Button
            onClick={runBenchmark}
            disabled={executing}
          >
            {executing
              ? "Ejecutando..."
              : "Ejecutar benchmark"}
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Gauge className="text-indigo-600" />

            <div>
              <p className="font-bold">
                MergeSort
              </p>

              <p className="text-xs text-slate-500">
                O(n log n)
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Gauge className="text-indigo-600" />

            <div>
              <p className="font-bold">
                QuickSort
              </p>

              <p className="text-xs text-slate-500">
                O(n log n) promedio
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Gauge className="text-indigo-600" />

            <div>
              <p className="font-bold">
                BinarySearch
              </p>

              <p className="text-xs text-slate-500">
                O(log n)
              </p>
            </div>
          </div>
        </Card>
      </div>

      {loading ? (
        <Card className="mt-6 p-8 text-center text-slate-500">
          Cargando benchmarks...
        </Card>
      ) : (
        <>
          <Card className="mt-6 p-5 sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <BarChart3 className="text-indigo-600" />

              <div>
                <h2 className="font-bold">
                  Resultados del backend
                </h2>

                <p className="text-xs text-slate-400">
                  Tiempo expresado en milisegundos.
                </p>
              </div>
            </div>

            <div className="h-[380px] w-full">
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="inputSize" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="score"
                    name="Tiempo (ms)"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="mt-6 overflow-hidden">
            <div className="border-b p-5">
              <h2 className="font-bold">
                Última ejecución
              </h2>

              {runs[0] && (
                <p className="mt-1 text-xs text-slate-400">
                  {runs[0].id} ·{" "}
                  {runs[0].framework} ·{" "}
                  {runs[0].datasetSize} elementos
                </p>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4 text-left">
                      Algoritmo
                    </th>

                    <th className="p-4 text-left">
                      Operación
                    </th>

                    <th className="p-4 text-right">
                      Entrada
                    </th>

                    <th className="p-4 text-right">
                      Resultado
                    </th>

                    <th className="p-4 text-right">
                      Error
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {results.map((result) => (
                    <tr
                      key={result.id}
                      className="border-t"
                    >
                      <td className="p-4 font-semibold">
                        {result.algorithm}
                      </td>

                      <td className="p-4">
                        {result.operation}
                      </td>

                      <td className="p-4 text-right">
                        {result.inputSize.toLocaleString()}
                      </td>

                      <td className="p-4 text-right">
                        {result.score.toFixed(2)}{" "}
                        {result.unit}
                      </td>

                      <td className="p-4 text-right">
                        {result.scoreError.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </>
  );
}

export default BenchmarksPage;
