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

import {
  mockAccounts,
  mockDashboard,
  mockTransactions
} from "../api/mock";

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(value);
}

function DashboardPage() {
  const dashboard = mockDashboard;

  return (
    <>
      <PageTitle
        title="Dashboard"
        description="Resumen general de cuentas y actividad transaccional."
      />

      {/* TARJETAS DE INFORMACIÓN */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Saldo agregado
              </p>

              <p className="mt-2 text-2xl font-bold">
                {formatMoney(dashboard.aggregateBalance)}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Disponible en todas las cuentas
              </p>
            </div>

            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <DollarSign size={20} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Cuentas
              </p>

              <p className="mt-2 text-2xl font-bold">
                {dashboard.totalAccounts}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Cuentas activas
              </p>
            </div>

            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <Wallet size={20} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Transacciones
              </p>

              <p className="mt-2 text-2xl font-bold">
                {dashboard.totalTransactions}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Registradas en el sistema
              </p>
            </div>

            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <CreditCard size={20} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Volumen mensual
              </p>

              <p className="mt-2 text-2xl font-bold">
                {formatMoney(dashboard.monthlyVolume)}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Movimientos del mes
              </p>
            </div>

            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <TrendingUp size={20} />
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_.8fr]">

        {/* ÚLTIMAS TRANSACCIONES */}
        <Card className="overflow-hidden">

          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h2 className="font-bold">
                Últimas transacciones
              </h2>

              <p className="text-xs text-slate-400">
                Actividad reciente
              </p>
            </div>

            <a
              href="/transactions"
              className="text-sm font-semibold text-indigo-600"
            >
              Ver todas
            </a>
          </div>

          <div className="divide-y divide-slate-100">

            {mockTransactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between gap-3 px-5 py-4"
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div
                    className={
                      "grid h-10 w-10 shrink-0 place-items-center rounded-full " +
                      (transaction.amount >= 0
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600")
                    }
                  >
                    {transaction.amount >= 0 ? (
                      <ArrowDownLeft size={18} />
                    ) : (
                      <ArrowUpRight size={18} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {transaction.description}
                    </p>

                    <p className="text-xs text-slate-400">
                      {transaction.id}
                      {" · "}
                      {new Date(transaction.date).toLocaleDateString("es-CO")}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={
                      "text-sm font-bold " +
                      (transaction.amount >= 0
                        ? "text-emerald-600"
                        : "text-slate-800")
                    }
                  >
                    {transaction.amount >= 0 ? "+" : ""}
                    {formatMoney(transaction.amount)}
                  </p>

                  <Badge
                    tone={
                      transaction.status === "COMPLETED"
                        ? "green"
                        : "amber"
                    }
                  >
                    {transaction.status === "COMPLETED"
                      ? "Completada"
                      : "Pendiente"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* CUENTAS */}
        <Card className="p-5">
          <h2 className="font-bold">
            Mis cuentas
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Saldos disponibles
          </p>

          <div className="mt-5 space-y-3">

            {mockAccounts.map((account) => (
              <div
                key={account.id}
                className="rounded-2xl bg-slate-950 p-5 text-white"
              >
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{account.type}</span>
                  <span>{account.number}</span>
                </div>

                <p className="mt-6 text-sm text-slate-300">
                  {account.name}
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {formatMoney(account.balance)}
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
