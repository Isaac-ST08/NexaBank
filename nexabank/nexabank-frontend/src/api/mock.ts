import type { Account, BenchmarkPoint, DashboardData, Transaction } from "../types";

export const mockAccounts: Account[] = [
  { id: "acc-1", name: "Cuenta Principal", number: "**** 4821", balance: 4850000, type: "Ahorros" },
  { id: "acc-2", name: "Cuenta Universitaria", number: "**** 9034", balance: 1285000, type: "Corriente" }
];

export const mockTransactions: Transaction[] = [
  { id: "TX-1008", date: "2026-09-25T09:30:00", type: "DEPOSIT", description: "Pago nómina", amount: 3200000, status: "COMPLETED", account: "**** 4821" },
  { id: "TX-1007", date: "2026-09-24T16:20:00", type: "TRANSFER", description: "Transferencia a Juan", amount: -450000, status: "COMPLETED", account: "**** 4821" },
  { id: "TX-1006", date: "2026-09-23T11:10:00", type: "WITHDRAWAL", description: "Retiro cajero", amount: -200000, status: "COMPLETED", account: "**** 9034" },
  { id: "TX-1005", date: "2026-09-22T13:45:00", type: "DEPOSIT", description: "Consignación", amount: 850000, status: "COMPLETED", account: "**** 4821" },
  { id: "TX-1004", date: "2026-09-20T08:15:00", type: "TRANSFER", description: "Pago servicios", amount: -185000, status: "PENDING", account: "**** 9034" },
  { id: "TX-1003", date: "2026-09-18T18:40:00", type: "WITHDRAWAL", description: "Compra supermercado", amount: -326000, status: "COMPLETED", account: "**** 4821" },
  { id: "TX-1002", date: "2026-09-15T10:00:00", type: "DEPOSIT", description: "Devolución", amount: 125000, status: "COMPLETED", account: "**** 9034" },
  { id: "TX-1001", date: "2026-09-12T15:30:00", type: "TRANSFER", description: "Pago matrícula", amount: -980000, status: "COMPLETED", account: "**** 9034" }
];

export const mockDashboard: DashboardData = {
  totalAccounts: 2,
  totalTransactions: 128,
  aggregateBalance: 6135000,
  monthlyVolume: 8450000
};

export const mockBenchmarks: BenchmarkPoint[] = [
  { inputSize: 100, mergeSortNanos: 12000, quickSortNanos: 9000, binarySearchNanos: 1800 },
  { inputSize: 500, mergeSortNanos: 26000, quickSortNanos: 21000, binarySearchNanos: 2500 },
  { inputSize: 1000, mergeSortNanos: 52000, quickSortNanos: 39000, binarySearchNanos: 3200 },
  { inputSize: 5000, mergeSortNanos: 310000, quickSortNanos: 250000, binarySearchNanos: 5100 },
  { inputSize: 10000, mergeSortNanos: 690000, quickSortNanos: 570000, binarySearchNanos: 6900 },
  { inputSize: 20000, mergeSortNanos: 1500000, quickSortNanos: 1240000, binarySearchNanos: 8200 }
];