export type TransactionType = "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  description: string;
  amount: number;
  status: "COMPLETED" | "PENDING" | "FAILED";
  account?: string;
}

export interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
  type: string;
}

export interface DashboardData {
  totalAccounts: number;
  totalTransactions: number;
  aggregateBalance: number;
  monthlyVolume: number;
}

export type AlgorithmName = "MERGE_SORT" | "QUICK_SORT";

export interface SortRequest {
  algorithm: AlgorithmName;
  field: "amount" | "date";
}

export interface SortResult {
  algorithm: AlgorithmName;
  inputSize: number;
  executionTimeNanos: number;
  sortedData: Transaction[];
}

export interface BenchmarkPoint {
  inputSize: number;
  mergeSortNanos: number;
  quickSortNanos: number;
  binarySearchNanos: number;
}