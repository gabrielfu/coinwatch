'use client';

import { useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { SiBinance } from "react-icons/si"
import Modal, { Heading, Input } from "./Modal";
import useCreatePortfolioModal from "@/app/hooks/useCreatePortfolioModal";
import Button from "../Button";
import axios, { AxiosError } from "axios";

const CreatePortfolioModal = () => {
  const portfolioModal = useCreatePortfolioModal();
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
 
export default CreatePortfolioModal;