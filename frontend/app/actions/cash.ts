import axios from "axios";
import { toast } from "react-hot-toast";
import { toastCatchAxios } from "./utils";
import { TransactionResponse } from "./transactions";
import dayjs from "dayjs";

export interface CashTransactionRequest {
  portfolioId: number;
  date: string;
  quantity: number;
  type: string;
}

export const createCashTransaction = async (transaction: CashTransactionRequest) => {
  await axios.post('/api/v1/cash', transaction)
    .then((res) => {
      toast.success(`Added new transaction`);
      return res.data;
    })
    .catch(toastCatchAxios);
}

export const searchCashTransactionsByPortfolio = async (portfolioId: string) => {
  return await axios.get(`/api/v1/cash/search?portfolioId=${portfolioId}`)
    .then((res) => res.data)
    .then((data: any[]) => data.map((record: any) => {
      const s: TransactionResponse = {
        id: record.id,
        portfolioId: record.portfolio,
        token: {
          symbol: "CASH",
          name: "Cash",
          logo: null,
        },
        date: dayjs(record.date).format("YYYY-MM-DD"),
        quantity: record.quantity,
        price: 1.0,
        type: record.type,
      };
      return s;
    }));
}