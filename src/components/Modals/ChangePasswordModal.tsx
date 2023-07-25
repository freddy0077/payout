// components/SuccessModal.tsx
import React, { FC } from "react";
import CustomModal, { ModalSize } from "./Modal";
import success from "../../assets/images/success.svg";
import warning from "../../assets/images/warning.svg";
import Button from "../Buttons/Button";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  return (
    <CustomModal isOpen={isOpen} size="md" onClose={onClose}>
      <div className="flex flex-col items-center justify-center space-y-2">
        <img src={warning} alt="success" width={300} />
        <h1 className="font-medium text-3xl">Password Expired!</h1>
          <a className="underline" href={`/change-password`} target="_blank">Change Password</a>
      </div>
    </CustomModal>
  );
};

export default ChangePasswordModal;
