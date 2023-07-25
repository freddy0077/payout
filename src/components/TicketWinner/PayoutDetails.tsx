// components/PayoutDetails.tsx
import React from "react";
import Button from "../Buttons/Button";
import people from "../../assets/images/recipients.svg";
import amount from "../../assets/images/amount.svg";

interface PayoutDetailsProps {
  recipients: number;
  totalAmount: number;
  onButtonClick: () => void;
}

const PayoutDetails: React.FC<PayoutDetailsProps> = ({
  recipients,
  totalAmount,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col mt-16 space-y-12 w-full h-auto">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center space-x-4">
          <img src={people} alt="people" />
          <h1 className="text-xl">Number of Recipients</h1>
        </div>
        <h1 className="font-medium text-3xl">{recipients}</h1>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center space-x-4">
          <img src={amount} alt="people" />
          <h1 className="text-xl">Total Amount</h1>
        </div>
        <h1 className="font-medium text-3xl">{totalAmount.toFixed(2)}</h1>
      </div>
      <Button onClick={onButtonClick} className="w-2/4 self-end">
        Confirm Payment
      </Button>
    </div>
  );
};

export default PayoutDetails;
