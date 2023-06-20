'use client';

import { useState } from "react";
import { toast } from "react-hot-toast";
import { SiBinance } from "react-icons/si"
import Modal, { Heading } from "./Modal";
import useCreatePortfolioModal from "@/app/hooks/useCreatePortfolioModal";
import Button from "../Button";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { twColors } from "@/app/twConfig";
import { toastCatchAxios } from "@/app/actions/utils";

const CreatePortfolioModal = () => {
  const portfolioModal = useCreatePortfolioModal();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  const onSubmit = () => {
    setIsLoading(true);
    axios.post('/api/v1/portfolios', { name: name })
      .then(() => {
        toast.success(`Created portfolio ${name}`);
        portfolioModal.onClose();
        portfolioModal.onSuccess();
      })
      .catch(toastCatchAxios)
      .finally(() => {
        setIsLoading(false);
      });
  }

  const sx = {
    "& label": {
      color: twColors.text,
    },
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiInput-underline:after": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        color: "white",
        borderColor: twColors.text
      },
      "&:hover fieldset": {
        borderColor: twColors.text
      },
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    }
  };
  const ip = { style: { color: "white" } };

  const onChange = (setValue: (value: any) => void) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    }
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <TextField 
        autoFocus
        type="text" 
        onWheel={(e) => e.target.blur()} 
        value={name} 
        onChange={onChange(setName)} 
        label="PortfolioName" 
        sx={sx} 
        inputProps={ip} 
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
      onSubmit={onSubmit}
      onClose={portfolioModal.onClose}
      title="Create New Portfolio"
      actionLabel="Submit"
      body={bodyContent}
      footer={footerContent}
    />
  );
}
 
export default CreatePortfolioModal;