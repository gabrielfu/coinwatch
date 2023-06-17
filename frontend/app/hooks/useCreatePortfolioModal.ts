import { create } from 'zustand';
import ModalStore from './modalStore';

type DeletePortfolioModalStore = {
  onSuccess: () => void;
  setOnSuccess: (callback: () => void) => void;
} & ModalStore

const useCreatePortfolioModal = create<DeletePortfolioModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onSuccess: () => {},
  setOnSuccess: (callback) => set({ onSuccess: callback }),
}));

export default useCreatePortfolioModal;
