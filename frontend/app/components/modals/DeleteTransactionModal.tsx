'use client';

import { useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import axios from "axios";
import useDeleteTransactionModal from "@/app/hooks/useDeleteTransactionModal";
import { toastCatchAxios } from "@/app/actions/utils";

const DeleteTransactionModal = () => {
  const deleteTransactionModal = useDeleteTransactionModal();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setIsLoading(true);
    axios.delete(`/api/v1/transactions/${deleteTransactionModal.transactionId}`)
      .then(() => {
        toast.success(`Deleted transaction`);
        deleteTransactionModal.onClose();
        deleteTransactionModal.onSuccess();
      })
      .catch(toastCatchAxios)
      .finally(() => {
        setIsLoading(false);
      });
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      Are you sure you want to delete this transaction?
      This action cannot be undone.
    </div>
  );

  return (
      <Modal 
        disabled={isLoading}
        isOpen={deleteTransactionModal.isOpen}
        onSubmit={onSubmit}
        onClose={deleteTransactionModal.onClose}
        title="Delete Transaction"
        actionLabel="Delete"
        body={bodyContent}
      />
    );
}
 
export default DeleteTransactionModal;