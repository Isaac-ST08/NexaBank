import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { getTransactions } from "../api/transactions.api";
import type { TransactionResponse } from "../api/transactions.api";

import {
  Badge,
  Card,
  PageTitle
} from "../components/ui";

import type { TransactionType } from "../types";

function formatMoney(
  value: number,
  currency: string
) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(Math.abs(value));
}

const transactionLabels: Record<
  TransactionType,
  string
> = {
  INCOME: "Ingreso",
  EXPENSE: "Gasto",
  TRANSFER: "Transferencia"
};

function TransactionsPage() {
  const [transactions, setTransactions] =
    useState<TransactionResponse[]>([]);

  const [search, setSearch] = useState("");

  const [type, setType] =
    useState<"ALL" | TransactionType>("ALL");

  const [sort, setSort] =
    useState("date-desc");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const response =
          await getTransactions(0, 100);

        setTransactions(response.data);
      } catch (error) {
        console.error(
          "No se pudieron cargar las transacciones:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    let result = transactions.filter(
      (transaction) => {
        const text =
          transaction.id +
          " " +
          transaction.description;

        const matchesSearch =
          text
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesType =
          type === "ALL" ||
          transaction.type === type;

        return (
          matchesSearch &&
          matchesType
        );
      }
    );

    result = [...result];

    if (sort === "amount-desc") {
      result.sort(
        (a, b) =>
          Number(b.amount) -
          Number(a.amount)
      );
    } else {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
    }

    return result;
  }, [
    transactions,
    search,
    type,
    sort
  ]);

  return (
    <>
      <PageTitle
        title="Transacciones"
        description="Consulta los movimientos almacenados en Firestore."
      />

      <Card className="overflow-hidden">

        <div className="grid gap-3 border-b p-5 md:grid-cols-[1fr_180px_180px]">

          <div className="relative">
            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={18}
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Buscar por ID o descripción..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-indigo-500"
            />
          </div>

          <select
            value={type}
            onChange={(event) =>
              setType(
                event.target.value as
                | "ALL"
                | TransactionType
              )
            }
            className="rounded-xl border border-slate-200 px-3 text-sm"
          >
            <option value="ALL">
              Todos los tipos
            </option>

            <option value="INCOME">
              Ingresos
            </option>

            <option value="EXPENSE">
              Gastos
            </option>

            <option value="TRANSFER">
              Transferencias
            </option>
          </select>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
            className="rounded-xl border border-slate-200 px-3 text-sm"
          >
            <option value="date-desc">
              Más recientes
            </option>

            <option value="amount-desc">
              Mayor monto
            </option>
          </select>
        </div>

        {loading ? (
          <div className="p-12 text-center text-sm text-slate-500">
            Cargando transacciones...
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">

                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3">ID</th>
                    <th className="px-5 py-3">Fecha</th>
                    <th className="px-5 py-3">Tipo</th>
                    <th className="px-5 py-3">Descripción</th>
                    <th className="px-5 py-3">Cuenta</th>
                    <th className="px-5 py-3 text-right">
                      Monto
                    </th>
                    <th className="px-5 py-3">Estado</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredTransactions.map(
                    (transaction) => {
                      const income =
                        transaction.type === "INCOME";

                      return (
                        <tr
                          key={transaction.id}
                          className="hover:bg-slate-50"
                        >
                          <td className="px-5 py-4 font-semibold">
                            {transaction.id}
                          </td>

                          <td className="px-5 py-4 text-slate-500">
                            {new Date(
                              transaction.createdAt
                            ).toLocaleDateString(
                              "es-CO"
                            )}
                          </td>

                          <td className="px-5 py-4">
                            <Badge tone="blue">
                              {
                                transactionLabels[
                                  transaction.type
                                ]
                              }
                            </Badge>
                          </td>

                          <td className="px-5 py-4">
                            {transaction.description}
                          </td>

                          <td className="px-5 py-4 text-slate-500">
                            {transaction.accountId}
                          </td>

                          <td
                            className={
                              "px-5 py-4 text-right font-bold " +
                              (income
                                ? "text-emerald-600"
                                : "text-slate-800")
                            }
                          >
                            {income ? "+" : "-"}
                            {formatMoney(
                              Number(
                                transaction.amount
                              ),
                              transaction.currency
                            )}
                          </td>

                          <td className="px-5 py-4">
                            <Badge
                              tone={
                                transaction.status ===
                                "COMPLETED"
                                  ? "green"
                                  : transaction.status ===
                                    "PENDING"
                                  ? "amber"
                                  : "red"
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>

            {filteredTransactions.length === 0 && (
              <div className="p-12 text-center text-sm text-slate-500">
                <SlidersHorizontal className="mx-auto mb-2" />
                No se encontraron transacciones.
              </div>
            )}
          </>
        )}
      </Card>
    </>
  );
}

export default TransactionsPage;
