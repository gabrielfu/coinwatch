'use client';

import { useState } from "react";
import { toast } from "react-hot-toast";
import { SiBinance } from "react-icons/si"
import Modal, { Heading } from "./Modal";
import useDeletePortfolioModal from "@/app/hooks/useDeletePortfolioModal";
import Button from "../Button";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";

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
      .catch((error) => {
        const message = error instanceof AxiosError
          ? error.response?.data.message
          : error.toString();
        toast.error(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      Are you sure you want to delete portfolio {deletePortfolioModal.portfolioName}?
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr className="border-tertiary my-4" />
      <Heading title="Import Portfolio" />
      <Button 
        label="Import from Binance"
        icon={SiBinance}
        onClick={() => {}} 
        secondary
      />
    </div>
  )

  return toRedirect
    ? redirect("/portfolios")
    : ( 
      <Modal 
        disabled={isLoading}
        isOpen={deletePortfolioModal.isOpen}
        onSubmit={onSubmit}
        onClose={deletePortfolioModal.onClose}
        title="Delete Portfolio"
        actionLabel="Submit"
        body={bodyContent}
        footer={footerContent}
      />
    );
}
 
export default DeletePortfolioModal;