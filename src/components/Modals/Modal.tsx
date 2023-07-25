import React, { FC, MouseEvent } from "react";
import cancel from "../../assets/images/cancel.svg";
export type ModalSize = "sm" | "md" | "lg" | "full";

interface CustomModalProps {
  isOpen: boolean;
  size: ModalSize;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomModal: FC<CustomModalProps> = ({
                                             isOpen,
                                             size,
                                             onClose,
                                             children,
                                           }) => {
  if (!isOpen) return null;

  const modalSizeClasses = {
    sm: "min-w-[500px] min-h-[300px]",
    md: "min-w-[650px] min-h-[400px]",
    lg: "min-w-[1500px] min-h-[800px]",
    full: "w-full h-full m-16",
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
      <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={handleClick}
      >
        <div
            className={`relative p-10 bg-white rounded-2xl ${modalSizeClasses[size]} overflow-y-auto max-h-80vh`}
            onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button
              className="absolute top-4 right-4 px-6 py-6 text-white"
              onClick={onClose}
          >
            <img src={cancel} alt="" />
            {}
          </button>
        </div>
      </div>
  );
};

export default CustomModal;
