import { useState } from "react";
import {
  Binary,
  Clock3,
  Play,
  Search,
  Zap
} from "lucide-react";

import {
  binarySearch,
  runSort,
  type SortResult
} from "../api/algorithms.api";

import {
  Badge,
  Button,
  Card,
  PageTitle
} from "../components/ui";

function AlgorithmsPage() {
  const [algorithm, setAlgorithm] =
    useState<"MERGE_SORT" | "QUICK_SORT">(
      "MERGE_SORT"
    );

  const [field, setField] =
    useState<"amount" | "createdAt">(
      "amount"
    );

  const [result, setResult] =
    useState<SortResult | null>(null);

  const [target, setTarget] =
    useState("TX-000001");

  const [searchField, setSearchField] =
    useState<"id" | "amount">("id");

  const [searchResult, setSearchResult] =
    useState<{
      found: boolean;
      position: number;
      executionTimeNanos: number;
    } | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function executeSort() {
    setLoading(true);

    try {
      const data = await runSort({
        algorithm,
        field,
        order: "ASC"
      });

      setResult(data);
    } catch (error) {
      console.error(
        "No se pudo ejecutar el algoritmo:",
        error
      );

      alert(
        "No se pudo ejecutar el algoritmo. Revisa el backend."
      );
    } finally {
      setLoading(false);
    }
  }

  async function executeSearch() {
    setLoading(true);

    try {
      const data = await binarySearch(
        target,
        searchField
      );

      setSearchResult(data);
    } catch (error) {
      console.error(
        "No se pudo ejecutar BinarySearch:",
        error
      );

      alert(
        "No se pudo ejecutar la búsqueda."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageTitle
        title="Algoritmos"
        description="Los algoritmos se ejecutan en nexabank-core a través del backend."
      />

      <div className="grid gap-6 xl:grid-cols-2">

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
                POST /api/v1/algorithms/sort
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
                    event.target.value as
                    | "MERGE_SORT"
                    | "QUICK_SORT"
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
                    | "createdAt"
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
              >
                <option value="amount">
                  Monto
                </option>

                <option value="createdAt">
                  Fecha
                </option>
              </select>
            </label>
          </div>

          <Button
            onClick={executeSort}
            disabled={loading}
            className="mt-5 flex items-center gap-2"
          >
            <Play size={16} />

            {loading
              ? "Ejecutando..."
              : "Ejecutar algoritmo"}
          </Button>

          {result && (
            <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
              <Clock3
                className="mb-2"
                size={18}
              />

              {result.algorithm} procesó{" "}
              {result.inputSize} registros en{" "}
              {result.executionTimeNanos} ns.
            </div>
          )}

          {result && (
            <div className="mt-5 overflow-hidden rounded-xl border">
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
                  {result.data
                    .slice(0, 6)
                    .map((item) => (
                      <tr
                        key={item.id}
                        className="border-t"
                      >
                        <td className="p-3">
                          {item.id}
                        </td>

                        <td className="p-3">
                          {item.description}
                        </td>

                        <td className="p-3 text-right">
                          {Number(
                            item.amount
                          ).toLocaleString(
                            "es-CO"
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

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
                POST /api/v1/algorithms/search
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            La búsqueda se ejecuta sobre las
            transacciones ordenadas por el backend.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-[150px_1fr_auto]">
            <select
              value={searchField}
              onChange={(event) =>
                setSearchField(
                  event.target.value as
                  | "id"
                  | "amount"
                )
              }
              className="rounded-xl border border-slate-200 px-3 py-3"
            >
              <option value="id">
                ID
              </option>

              <option value="amount">
                Monto
              </option>
            </select>

            <input
              value={target}
              onChange={(event) =>
                setTarget(event.target.value)
              }
              placeholder="TX-000001"
              className="rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-indigo-500"
            />

            <Button
              onClick={executeSearch}
              disabled={loading}
            >
              <Search size={17} />
            </Button>
          </div>

          {searchResult && (
            <div className="mt-5">
              <Badge
                tone={
                  searchResult.found
                    ? "green"
                    : "red"
                }
              >
                {searchResult.found
                  ? `Encontrado en posición ${searchResult.position}`
                  : "No encontrado"}
              </Badge>

              <p className="mt-2 text-sm text-slate-500">
                Tiempo:{" "}
                {searchResult.executionTimeNanos} ns
              </p>
            </div>
          )}

          <div className="mt-8 rounded-2xl bg-slate-950 p-5 text-white">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Flujo
            </p>

            <pre className="mt-3 text-xs leading-6 text-slate-300">
{`React
  ↓
Spring Boot
  ↓
AlgorithmService
  ↓
nexabank-core
  ↓
BinarySearch`}
            </pre>
          </div>
        </Card>
      </div>
    </>
  );
}

export default AlgorithmsPage;
