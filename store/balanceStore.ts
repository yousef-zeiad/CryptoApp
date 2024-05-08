import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./mmkv-storage";
export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  title: string;
}

export interface BalanceState {
  transactions: Transaction[];
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clearTransaction: () => void;
}

export const useBalanceStore = create<BalanceState>()(
  persist(
    (set, get) => ({
      transactions: [],
      runTransaction: (transaction) => {
        set((state) => ({
          transactions: [...state.transactions, transaction],
        }));
      },
      balance: () => {
        return get().transactions.reduce((acc, transaction) => {
          return acc + transaction.amount;
        }, 0);
      },
      clearTransaction: () => {
        set({ transactions: [] });
      },
    }),
    {
      name: "balance",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
