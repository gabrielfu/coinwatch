'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

export const Heading = ({ 
  title, 
  subtitle,
  center
}: {
  title?: string;
  subtitle?: string;
  center?: boolean;
}) => {
  return ( 
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-2xl font-bold">
        {title}
      </div>
      <div className="font-light text-text mt-2">
        {subtitle}
      </div>
    </div>
   );
}

export const Input = ({
  id,
  label,
  type = "text", 
  disabled, 
  formatPrice,
  register,
  required,
  errors,
  autoFocus,
}: {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  autoFocus?: boolean;
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar size={24} className="text-text absolute top-5 left-2"/>
      )}
      <input
        id={id}
        disabled={disabled}
        autoFocus={autoFocus}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          peer w-full p-2 pt-6 
          bg-white text-primary font-medium border-2 rounded-md outline-none transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-red-500' : 'border-border'}
          ${errors[id] ? 'focus:border-red-500' : 'focus:border-border'}
        `}
      />
      <label 
        className={`
          absolute text-md duration-150 transform -translate-y-3 top-4 z-10 origin-[0] 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-red-500' : 'text-text'}
        `}
      >
        {label}
      </label>
    </div>
   );
}

const Modal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  subtitle, 
  body, 
  actionLabel, 
  footer, 
  disabled,
  secondaryAction,
  secondaryActionLabel
}: {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  subtitle?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const ref = useRef(null);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
  
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key == "Escape") {
      handleClose();
    }
  };

  const handleClick = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (ref?.current?.contains && !ref.current.contains(evt.target)) {
      handleClose();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mouseup", handleClick);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mouseup", handleClick);
    }
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div 
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto 
          fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
        ref={ref}
      >
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/*content*/}
          <div className={`
            translate duration-300 h-full 
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg p-4 
              relative flex flex-col w-full bg-primary text-white outline-none focus:outline-none"
            >
              {/*header*/}
              <div className="flex p-6 rounded-t justify-between items-start">
                <Heading
                  title={title}
                  subtitle={subtitle}
                />
                <button
                  className="p-1 border-0 hover:opacity-70 transition"
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
              </div>
              {/*body*/}
              <div className="relative px-6 flex-auto">
                {body}
              </div>
              <div className="flex flex-col gap-2 p-6">
                {/*action*/}
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button 
                      disabled={disabled} 
                      label={secondaryActionLabel} 
                      onClick={handleSecondaryAction}
                      secondary
                    />  
                  )}
                  <Button 
                    disabled={disabled} 
                    label={actionLabel} 
                    onClick={handleSubmit}
                  />
                </div>
                {/*footer*/}
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
