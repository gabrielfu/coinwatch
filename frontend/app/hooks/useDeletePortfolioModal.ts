import { create } from 'zustand';
import ModalStore from './modalStore';

type DeletePortfolioModalStore = {
  portfolioId: string;
  setPortfolioId: (portfolioId: string) => void;
  portfolioName: string;
  setPortfolioName: (portfolioName: string) => void;
} & ModalStore

const useDeletePortfolioModal = create<DeletePortfolioModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  portfolioId: "",
  portfolioName: "",
  setPortfolioId: (portfolioId: string) => set({ portfolioId }),
  setPortfolioName: (portfolioName: string) => set({ portfolioName }),
}));

export default useDeletePortfolioModal;
