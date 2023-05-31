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
  return await fetch(`/api/v1/portfolios`)
    .then((res) => (res.json() as Promise<PortfolioInfo[]>));
}
