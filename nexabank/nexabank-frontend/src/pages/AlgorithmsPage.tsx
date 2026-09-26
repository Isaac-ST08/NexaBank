import { useMemo, useState } from "react";
import {
  Binary,
  Clock3,
  Play,
  Search,
  Zap
} from "lucide-react";

import { mockTransactions } from "../api/mock";
import {
  Badge,
  Button,
  Card,
  PageTitle
} from "../components/ui";

import type { AlgorithmName } from "../types";

function AlgorithmsPage() {
  const [algorithm, setAlgorithm] =
    useState<AlgorithmName>("MERGE_SORT");

  const [field, setField] =
    useState<"amount" | "date">("amount");

  const [target, setTarget] =
    useState("TX-1008");

  const [result, setResult] =
    useState("");

  const [searchResult, setSearchResult] =
    useState("");

  const [running, setRunning] =
    useState(false);

  // Creamos una copia de las transacciones y
  // las ordenamos para mostrar el resultado.
  const preview = useMemo(() => {
    const data = [...mockTransactions];

    data.sort((a, b) => {
      if (field === "amount") {
        return a.amount - b.amount;
      }

      return (
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
      );
    });

    return data;
  }, [field]);

  async function runAlgorithm() {
    setRunning(true);

    const start = performance.now();

    // Esto solamente simula el tiempo del backend.
    // Después se reemplazará por la petición real.
    await new Promise((resolve) =>
      setTimeout(resolve, 450)
    );

    const end = performance.now();
    const time = (end - start).toFixed(2);

    let algorithmName = "MergeSort";

    if (algorithm === "QUICK_SORT") {
      algorithmName = "QuickSort";
    }

    setResult(
      algorithmName +
      " ordenó " +
      preview.length +
      " registros por " +
      field +
      " en " +
      time +
      " ms (demo local)."
    );

    setRunning(false);
  }

  function searchTransaction() {
    const text = target.toLowerCase();

    const transaction = mockTransactions.find((item) => {
      return (
        item.id.toLowerCase() === text ||
        item.description.toLowerCase().includes(text)
      );
    });

    if (transaction) {
      setSearchResult(
        "Encontrado: " +
        transaction.id +
        " — " +
        transaction.description
      );
    } else {
      setSearchResult(
        "No se encontró ningún registro."
      );
    }
  }

  return (
    <>
      <PageTitle
        title="Algoritmos"
        description="Playground para ejecutar los algoritmos de NexaBank sobre transacciones."
      />

      <div className="grid gap-6 xl:grid-cols-2">

        {/* SORT */}
        <Card className="p-6">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <Zap />
            </div>

            <div>
              <h2 className="font-bold">
                Sort Playground
              </h2>

              <p className="text-xs text-slate-400">
                /api/algorithms/sort
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">

            <label className="text-sm font-semibold">
              Algoritmo

              <select
                value={algorithm}
                onChange={(event) =>
                  setAlgorithm(
                    event.target.value as AlgorithmName
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
              >
                <option value="MERGE_SORT">
                  MergeSort
                </option>

                <option value="QUICK_SORT">
                  QuickSort
                </option>
              </select>
            </label>

            <label className="text-sm font-semibold">
              Campo

              <select
                value={field}
                onChange={(event) =>
                  setField(
                    event.target.value as
                    | "amount"
                    | "date"
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
              >
                <option value="amount">
                  Monto
                </option>

                <option value="date">
                  Fecha
                </option>
              </select>
            </label>
          </div>

          <Button
            onClick={runAlgorithm}
            disabled={running}
            className="mt-5 flex items-center gap-2"
          >
            <Play size={16} />

            {running
              ? "Ejecutando..."
              : "Ejecutar algoritmo"}
          </Button>

          {result && (
            <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
              <Clock3
                className="mb-2"
                size={18}
              />
              {result}
            </div>
          )}

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-3 text-left">
                    ID
                  </th>

                  <th className="p-3 text-left">
                    Descripción
                  </th>

                  <th className="p-3 text-right">
                    Monto
                  </th>
                </tr>
              </thead>

              <tbody>
                {preview.slice(0, 6).map((item) => (
                  <tr
                    key={item.id}
                    className="border-t"
                  >
                    <td className="p-3 font-medium">
                      {item.id}
                    </td>

                    <td className="p-3">
                      {item.description}
                    </td>

                    <td className="p-3 text-right">
                      {item.amount.toLocaleString("es-CO")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* BINARY SEARCH */}
        <Card className="p-6">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Binary />
            </div>

            <div>
              <h2 className="font-bold">
                Binary Search Playground
              </h2>

              <p className="text-xs text-slate-400">
                /api/algorithms/search
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Busca sobre datos ordenados. En producción,
            el backend ejecutará BinarySearch del módulo
            nexabank-core.
          </p>

          <div className="mt-6 flex gap-2">
            <input
              value={target}
              onChange={(event) =>
                setTarget(event.target.value)
              }
              placeholder="TX-1008 o descripción"
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-indigo-500"
            />

            <Button onClick={searchTransaction}>
              <Search size={17} />
            </Button>
          </div>

          {searchResult && (
            <div className="mt-5">
              <Badge
                tone={
                  searchResult.startsWith("Encontrado")
                    ? "green"
                    : "red"
                }
              >
                {searchResult}
              </Badge>
            </div>
          )}

          <div className="mt-8 rounded-2xl bg-slate-950 p-5 text-white">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Contrato
            </p>

            <pre className="mt-3 overflow-auto text-xs leading-6 text-slate-300">
{`POST /api/algorithms/search

{
  "target": "${target}",
  "field": "id"
}`}
            </pre>
          </div>
        </Card>
      </div>
    </>
  );
}

export default AlgorithmsPage;
