import React, { ReactNode, FC } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-16 py-5 bg-primary-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-primary-600 focus:outline-none cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
