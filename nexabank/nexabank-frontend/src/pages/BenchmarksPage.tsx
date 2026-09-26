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

import { mockBenchmarks } from "../api/mock";

import {
  Card,
  PageTitle
} from "../components/ui";

function BenchmarksPage() {

  // Convertimos nanosegundos a milisegundos
  // para que sea más fácil leer el gráfico.
  const chartData = mockBenchmarks.map((item) => {
    return {
      inputSize: item.inputSize,

      mergeMs: Number(
        (item.mergeSortNanos / 1000000).toFixed(3)
      ),

      quickMs: Number(
        (item.quickSortNanos / 1000000).toFixed(3)
      ),

      binaryMs: Number(
        (item.binarySearchNanos / 1000000).toFixed(3)
      )
    };
  });

  return (
    <>
      <PageTitle
        title="Benchmarks"
        description="Comparación empírica de los algoritmos medidos con JMH."
      />

      <div className="grid gap-4 md:grid-cols-3">

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <Gauge size={19} />
            </div>

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
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <Gauge size={19} />
            </div>

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
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <Gauge size={19} />
            </div>

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

      <Card className="mt-6 p-5 sm:p-7">

        <div className="mb-5 flex items-center gap-3">
          <BarChart3 className="text-indigo-600" />

          <div>
            <h2 className="font-bold">
              Tiempo vs tamaño de entrada
            </h2>

            <p className="text-xs text-slate-400">
              Datos de ejemplo; después serán reemplazados
              por /api/benchmarks/results.
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
                dataKey="mergeMs"
                name="MergeSort (ms)"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="quickMs"
                name="QuickSort (ms)"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="binaryMs"
                name="BinarySearch (ms)"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="mt-6 overflow-hidden">

        <div className="border-b p-5">
          <h2 className="font-bold">
            Resultados JMH
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">

            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left">
                  Entrada
                </th>

                <th className="p-4 text-right">
                  MergeSort
                </th>

                <th className="p-4 text-right">
                  QuickSort
                </th>

                <th className="p-4 text-right">
                  BinarySearch
                </th>
              </tr>
            </thead>

            <tbody>
              {chartData.map((item) => (
                <tr
                  key={item.inputSize}
                  className="border-t"
                >
                  <td className="p-4 font-semibold">
                    {item.inputSize.toLocaleString()}
                  </td>

                  <td className="p-4 text-right">
                    {item.mergeMs} ms
                  </td>

                  <td className="p-4 text-right">
                    {item.quickMs} ms
                  </td>

                  <td className="p-4 text-right">
                    {item.binaryMs} ms
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

export default BenchmarksPage;
