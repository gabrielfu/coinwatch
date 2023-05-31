'use client';

import { useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { SiBinance } from "react-icons/si"
import Modal, { Heading, Input } from "./Modal";
import usePortfolioModal from "@/app/hooks/usePortfolioModal";
import Button from "../Button";
import axios from "axios";

const PortfolioModal = () => {
  const portfolioModal = usePortfolioModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios.post('/api/v1/portfolios', data)
      .then(() => {
        toast.success(`Created portfolio ${data.name}`);
        portfolioModal.onClose();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="name"
        label="Portfolio Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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

  return ( 
    <Modal 
      disabled={isLoading}
      isOpen={portfolioModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      onClose={portfolioModal.onClose}
      title="Create New Portfolio"
      actionLabel="Submit"
      body={bodyContent}
      footer={footerContent}
    />
   );
}
 
export default PortfolioModal;