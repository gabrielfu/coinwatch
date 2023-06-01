import { create } from 'zustand';
import ModalStore from './modalStore';

type DeletePortfolioModalStore = {
  portfolioId: string;
  setPortfolioId: (portfolioId: string) => void;
} & ModalStore

const useDeletePortfolioModal = create<DeletePortfolioModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  portfolioId: "",
  setPortfolioId: (portfolioId: string) => set({ portfolioId }),
}));

export default useDeletePortfolioModal;
