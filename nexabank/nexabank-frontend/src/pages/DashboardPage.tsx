import { useEffect, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  TrendingUp,
  Wallet
} from "lucide-react";

import {
  Badge,
  Card,
  PageTitle
} from "../components/ui";

import { getAccounts } from "../api/accounts.api";
import {
  getTransactions,
  type TransactionResponse
} from "../api/transactions.api";

import type { Account } from "../types";

function formatMoney(value: number, currency = "COP") {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

function DashboardPage() {
  const [accounts, setAccounts] =
    useState<Account[]>([]);

  const [transactions, setTransactions] =
    useState<TransactionResponse[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const accountsData = await getAccounts();
        const transactionsData =
          await getTransactions(0, 100);

        setAccounts(accountsData);
        setTransactions(transactionsData.data);
      } catch (error) {
        console.error(
          "No se pudieron cargar los datos:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const balance = accounts
    .filter((account) => account.currency === "COP")
    .reduce(
      (total, account) =>
        total + Number(account.balance),
      0
    );

  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const monthlyVolume = transactions
    .filter((transaction) => {
      const date = new Date(transaction.createdAt);

      return (
        date.getMonth() === month &&
        date.getFullYear() === year
      );
    })
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  if (loading) {
    return (
      <Card className="p-8 text-center text-slate-500">
        Cargando información...
      </Card>
    );
  }

  return (
    <>
      <PageTitle
        title="Dashboard"
        description="Resumen de las cuentas y transacciones reales del backend."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <Card className="p-5">
          <p className="text-sm text-slate-500">
            Saldo agregado
          </p>

          <p className="mt-2 text-2xl font-bold">
            {formatMoney(balance)}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Cuentas en COP
          </p>

          <DollarSign className="mt-3 text-indigo-600" />
        </Card>

        <Card className="p-5">
          <p className="text-sm text-slate-500">
            Cuentas
          </p>

          <p className="mt-2 text-2xl font-bold">
            {accounts.length}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Cuentas del usuario
          </p>

          <Wallet className="mt-3 text-indigo-600" />
        </Card>

        <Card className="p-5">
          <p className="text-sm text-slate-500">
            Transacciones
          </p>

          <p className="mt-2 text-2xl font-bold">
            {transactions.length}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Registros cargados
          </p>

          <CreditCard className="mt-3 text-indigo-600" />
        </Card>

        <Card className="p-5">
          <p className="text-sm text-slate-500">
            Volumen mensual
          </p>

          <p className="mt-2 text-2xl font-bold">
            {formatMoney(monthlyVolume)}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Movimientos del mes
          </p>

          <TrendingUp className="mt-3 text-indigo-600" />
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_.8fr]">

        <Card className="overflow-hidden">
          <div className="border-b p-5">
            <h2 className="font-bold">
              Últimas transacciones
            </h2>

            <p className="text-xs text-slate-400">
              Datos obtenidos desde Spring Boot
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {transactions.slice(0, 5).map(
              (transaction) => {
                const income =
                  transaction.type === "INCOME";

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between gap-3 px-5 py-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={
                          "grid h-10 w-10 shrink-0 place-items-center rounded-full " +
                          (income
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-600")
                        }
                      >
                        {income ? (
                          <ArrowDownLeft size={18} />
                        ) : (
                          <ArrowUpRight size={18} />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          {transaction.description}
                        </p>

                        <p className="text-xs text-slate-400">
                          {transaction.id}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold">
                        {income ? "+" : "-"}
                        {formatMoney(
                          Number(transaction.amount),
                          transaction.currency
                        )}
                      </p>

                      <Badge
                        tone={
                          transaction.status ===
                          "COMPLETED"
                            ? "green"
                            : "amber"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-bold">
            Mis cuentas
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Datos obtenidos desde /api/v1/accounts
          </p>

          <div className="mt-5 space-y-3">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="rounded-2xl bg-slate-950 p-5 text-white"
              >
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{account.type}</span>
                  <span>{account.currency}</span>
                </div>

                <p className="mt-5 text-sm">
                  {account.name}
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {formatMoney(
                    Number(account.balance),
                    account.currency
                  )}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

export default DashboardPage;
