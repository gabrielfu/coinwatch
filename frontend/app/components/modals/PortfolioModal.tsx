'use client';

import { useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc"
import Modal, { Heading, Input } from "./Modal";
import usePortfolioModal from "@/app/hooks/usePortfolioModal";
import Button from "../Button";

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

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}} 
      />
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Already have an account?
          <span 
            // onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Log in</span>
        </p>
      </div>
    </div>
  )

  return ( 
    <Modal 
      disabled={isLoading}
      isOpen={portfolioModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      onClose={portfolioModal.onClose}
      title="Create New Portfolio"
      actionLabel="Create"
      body={bodyContent}
      footer={footerContent}
    />
   );
}
 
export default PortfolioModal;