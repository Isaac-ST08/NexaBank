import { useMemo, useState } from "react";
import { Download, Search, SlidersHorizontal } from "lucide-react";

import { mockTransactions } from "../api/mock";
import { Badge, Button, Card, PageTitle } from "../components/ui";

import type { TransactionType } from "../types";

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(Math.abs(value));
}

const transactionLabels: Record<TransactionType, string> = {
  DEPOSIT: "Depósito",
  WITHDRAWAL: "Retiro",
  TRANSFER: "Transferencia"
};

function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"ALL" | TransactionType>("ALL");
  const [sort, setSort] = useState("date-desc");

  // Filtramos y ordenamos los datos.
  const filteredTransactions = useMemo(() => {
    let result = mockTransactions.filter((transaction) => {

      const text =
        transaction.id +
        " " +
        transaction.description;

      const matchesSearch = text
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        type === "ALL" ||
        transaction.type === type;

      return matchesSearch && matchesType;
    });

    if (sort === "amount-desc") {
      result = result.sort(
        (a, b) =>
          Math.abs(b.amount) - Math.abs(a.amount)
      );
    } else {
      result = result.sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      );
    }

    return result;
  }, [search, type, sort]);

  return (
    <>
      <PageTitle
        title="Transacciones"
        description="Consulta, filtra y ordena las operaciones almacenadas."
        action={
          <Button variant="secondary">
            <Download size={16} />
            Exportar
          </Button>
        }
      />

      <Card className="overflow-hidden">

        {/* FILTROS */}
        <div className="grid gap-3 border-b border-slate-100 p-5 md:grid-cols-[1fr_180px_180px]">

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
              className={
                "w-full rounded-xl border border-slate-200 " +
                "py-2.5 pl-10 pr-3 text-sm outline-none " +
                "focus:border-indigo-500"
              }
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

            <option value="DEPOSIT">
              Depósitos
            </option>

            <option value="WITHDRAWAL">
              Retiros
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

        {/* TABLA */}
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

              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-slate-50"
                >
                  <td className="px-5 py-4 font-semibold">
                    {transaction.id}
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {new Date(transaction.date).toLocaleDateString("es-CO")}
                  </td>

                  <td className="px-5 py-4">
                    <Badge tone="blue">
                      {transactionLabels[transaction.type]}
                    </Badge>
                  </td>

                  <td className="px-5 py-4">
                    {transaction.description}
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {transaction.account}
                  </td>

                  <td
                    className={
                      "px-5 py-4 text-right font-bold " +
                      (transaction.amount >= 0
                        ? "text-emerald-600"
                        : "text-slate-800")
                    }
                  >
                    {transaction.amount >= 0 ? "+" : "-"}
                    {formatMoney(transaction.amount)}
                  </td>

                  <td className="px-5 py-4">
                    <Badge
                      tone={
                        transaction.status === "COMPLETED"
                          ? "green"
                          : transaction.status === "PENDING"
                          ? "amber"
                          : "red"
                      }
                    >
                      {transaction.status === "COMPLETED"
                        ? "Completada"
                        : transaction.status === "PENDING"
                        ? "Pendiente"
                        : "Fallida"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="p-12 text-center text-sm text-slate-500">
            <SlidersHorizontal
              className="mx-auto mb-2"
            />
            No se encontraron transacciones.
          </div>
        )}
      </Card>
    </>
  );
}

export default TransactionsPage;
