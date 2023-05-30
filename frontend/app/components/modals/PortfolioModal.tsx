'use client';

import { useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal, { Heading, Input } from "./Modal";
import usePortfolioModal from "@/app/hooks/usePortfolioModal";

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
    setTimeout(() => {
      portfolioModal.onClose();
      setIsLoading(false);
    }, 5000);

    // axios.post('/api/register', data)
    // .then(() => {
    //   toast.success(`Created portfolio ${data.name}`);
    //   portfolioModal.onClose();
    // })
    // .catch((error) => {
    //   toast.error(error);
    // })
    // .finally(() => {
    //   setIsLoading(false);
    // })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Create a new portfolio"
        subtitle="subtitle!"
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return ( 
    <Modal 
      disabled={isLoading}
      isOpen={portfolioModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      onClose={portfolioModal.onClose}
      title="Create New Portfolio"
      actionLabel="Create"
      body={bodyContent}
    />
   );
}
 
export default PortfolioModal;