import { create } from 'zustand';
import ModalStore from './modalStore';

type DeleteTransactionModalStore = {
  transactionId: string;
  setTransactionId: (transactionId: string) => void;
  onSuccess: () => void;
  setOnSuccess: (callback: () => void) => void;
} & ModalStore

const useDeleteTransactionModal = create<DeleteTransactionModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  transactionId: "",
  setTransactionId: (transactionId: string) => set({ transactionId }),
  onSuccess: () => {},
  setOnSuccess: (callback) => set({ onSuccess: callback }),
}));

export default useDeleteTransactionModal;
