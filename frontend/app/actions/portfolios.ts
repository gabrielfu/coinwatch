import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export interface PortfolioInfo {
  id: number;
  name: string;
}

export interface PortfolioData {
  id: number;
  name: string;
  marketValue: number;
  dayChange: number;
  dayChangePercent: number;
  totalChange: number;
  totalChangePercent: number;
}

export const getPortfolios = async () => {
  return await axios.get(`/api/v1/portfolios`)
    .then((res) => (res.data as Promise<PortfolioInfo[]>));
}

export const getPortfolio = async (id: string) => {
  return await axios.get(`/api/v1/portfolios/${id}`)
    .then((res) => (res.data as Promise<PortfolioInfo>));
}

export const updatePortfolio = async (id: string, name: string, onSuccess?: () => void) => {
  await axios.put(`/api/v1/portfolios/${id}`, { name: name })
    .then((res) => res.data)
    .then(onSuccess)
    .catch((error) => {
      const message = error instanceof AxiosError
        ? error.response?.data.message
        : error.toString();
      toast.error(message);
    });
}
