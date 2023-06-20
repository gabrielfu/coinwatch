import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";
import { toastCatchAxios } from "./utils";

export interface TransactionRequest {
  portfolioId: number;
  tokenSymbol: string;
  date: string;
  quantity: number;
  purchasePrice: number;
  type: string;
}

export interface TokenResponse {
  symbol: string;
  name: string;
  logo: string;
}

export interface TransactionResponse {
  id: number;
  portfolioId: number;
  token: TokenResponse;
  date: string;
  quantity: number;
  price: number;
  type: string;
}

export const createTransaction = async (transaction: TransactionRequest) => {
  await axios.post('/api/v1/transactions', transaction)
    .then((res) => {
      toast.success(`Added new transaction`);
      return res.data;
    })
    .catch(toastCatchAxios);
}

export const getTransactions = async () => {
  return await fetch(`/api/v1/transactions`)
    .then((res) => res.json())
    .then((data: any[]) => data.map((record: any) => {
      const s: TransactionResponse = {
        id: record.id,
        portfolioId: record.portfolio,
        token: record.token,
        date: dayjs(record.date).format("YYYY-MM-DD"),
        quantity: record.quantity,
        price: record. purchasePrice,
        type: record.type,
      };
      return s;
    }));
}

export const searchTransactionsByPortfolio = async (portfolioId: string) => {
  return await fetch(`/api/v1/transactions/search?portfolioId=${portfolioId}`)
    .then((res) => res.json())
    .then((data: any[]) => data.map((record: any) => {
      const s: TransactionResponse = {
        id: record.id,
        portfolioId: record.portfolio,
        token: record.token,
        date: dayjs(record.date).format("YYYY-MM-DD"),
        quantity: record.quantity,
        price: record. purchasePrice,
        type: record.type,
      };
      return s;
    }));
}

export const deleteTransaction = async (id: string) => {
  await axios.delete(`/api/v1/transactions/${id}`)
    .then((res) => {
      toast.success(`Deleted transaction`);
      return res.data;
    })
    .catch(toastCatchAxios);
}
