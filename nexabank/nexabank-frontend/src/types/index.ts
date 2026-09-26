export type TransactionType =
  | "INCOME"
  | "EXPENSE"
  | "TRANSFER";

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  category: string;
  amount: number;
  currency: string;
  description: string;
  status:
    | "COMPLETED"
    | "PENDING"
    | "FAILED"
    | "CANCELLED";
  timestamp: string;
  createdAt: string;
}

export interface Account {
  id: string;
  name: string;
  currency: string;
  balance: number;
  type: string;
  status: string;
}

export type AlgorithmName =
  | "MERGE_SORT"
  | "QUICK_SORT";
