// TicketWinners.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomModal, { ModalSize } from "../components/Modals/Modal";
import Header from "../components/TicketWinner/Header";
import PayoutDetails from "../components/TicketWinner/PayoutDetails";
import success from "../assets/images/success.svg";

const TicketWinners = () => {
  const options = ["Filter", "Ticket Serial No", "Number of Player"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<ModalSize>("md");
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOptionSelected = (option: string) => {
    setSelectedOption(option);
  };

  const openModal = (size: ModalSize) => {
    setModalSize(size);
    setModalOpen(true);
  };

  const handleConfirmPayment = () => {
    setTimeout(() => {
      setModalOpen(false);
      setSecondModalOpen(true);
    }, 2000);

    setTimeout(() => {
      setSecondModalOpen(false);
      navigate("/message");
    }, 4000);
  };

  return (
    <div className="flex flex-col w-full px-24 h-screen">
      <Header
        title="Ticket Winners"
        selectedOption={selectedOption}
        options={options}
        onOptionSelected={handleOptionSelected}
        onButtonClick={() => openModal("md")}
      />
      <CustomModal
        isOpen={modalOpen}
        size={modalSize}
        onClose={() => setModalOpen(false)}
      >
        <h2 className="mb-4 text-2xl text-primary-500">Payout Details</h2>
        <PayoutDetails
          recipients={200}
          totalAmount={1500}
          onButtonClick={handleConfirmPayment}
        />
      </CustomModal>
      <CustomModal
        isOpen={secondModalOpen}
        size="md"
        onClose={() => setSecondModalOpen(false)}
      >
        <h2 className="mb-4 text-2xl text-primary-500">{}</h2>
        <div className="flex flex-col items-center justify-center space-y-2">
          <img src={success} alt="success" width={300} />
          <h1 className="font-medium text-3xl">Payment Made Successfully</h1>
        </div>
      </CustomModal>
    </div>
  );
};

export default TicketWinners;
