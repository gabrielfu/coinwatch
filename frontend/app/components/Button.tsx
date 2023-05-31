'use client';

import { IconType } from "react-icons";

const Button = ({ 
  label, 
  onClick, 
  disabled, 
  secondary,
  small,
  icon: Icon,
}: {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  secondary?: boolean;
  small?: boolean;
  icon?: IconType;
}) => {
  return ( 
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${secondary ? 'bg-tertiary' : 'bg-highlight'}
        ${secondary ? 'border-tertiary' : 'border-highlight'}
        ${secondary ? 'text-text' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {label}
    </button>
   );
}
 
export default Button;
