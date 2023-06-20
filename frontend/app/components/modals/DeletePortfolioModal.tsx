'use client';

import { useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import axios from "axios";
import { redirect } from "next/navigation";
import useDeletePortfolioModal from "@/app/hooks/useDeletePortfolioModal";
import { toastCatchAxios } from "@/app/actions/utils";

const DeletePortfolioModal = () => {
  const deletePortfolioModal = useDeletePortfolioModal();
  const [isLoading, setIsLoading] = useState(false);
  const [toRedirect, setRedirect] = useState(false);

  const onSubmit = () => {
    setIsLoading(true);
    axios.delete(`/api/v1/portfolios/${deletePortfolioModal.portfolioId}`)
      .then(() => {
        toast.success(`Deleted portfolio ${deletePortfolioModal.portfolioId}`);
        deletePortfolioModal.onClose();
        setRedirect(true);
      })
      .catch(toastCatchAxios)
      .finally(() => {
        setIsLoading(false);
      });
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      Are you sure you want to delete portfolio {deletePortfolioModal.portfolioName}?
      This action cannot be undone.
    </div>
  );

  return toRedirect
    ? redirect("/portfolios")
    : ( 
      <Modal 
        disabled={isLoading}
        isOpen={deletePortfolioModal.isOpen}
        onSubmit={onSubmit}
        onClose={deletePortfolioModal.onClose}
        title="Delete Portfolio"
        actionLabel="Delete"
        body={bodyContent}
      />
    );
}
 
export default DeletePortfolioModal;