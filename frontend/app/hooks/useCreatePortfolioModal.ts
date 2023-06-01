import { create } from 'zustand';
import ModalStore from './modalStore';

const useCreatePortfolioModal = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useCreatePortfolioModal;
