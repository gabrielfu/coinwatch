export interface PortfolioInfo {
  name: string;
}

export interface PortfolioData {
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
