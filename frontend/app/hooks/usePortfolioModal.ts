import { create } from 'zustand';

interface PortfolioModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePortfolioModal = create<PortfolioModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default usePortfolioModal;
