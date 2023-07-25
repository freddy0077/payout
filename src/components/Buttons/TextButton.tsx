import React, { ReactNode, FC } from "react";
import arrow from "../../assets/images/arrow.svg";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

const TextButton: FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  className,
}) => {
  return (
    <div onClick={onClick} className={`${className}`}>
      {children}
      <img src={arrow} alt="arrow" />
    </div>
  );
};

export default TextButton;
