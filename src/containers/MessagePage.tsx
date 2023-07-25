// MessagePage.tsx
import React, { useState } from "react";
import Button from "../components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import MessageForm from "../components/Message/MessageForm";
import SuccessModal from "../components/Modals/SuccessModal";

const MessagePage = () => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextAreaValue(event.target.value);
  };

  const handleClick = () => {
    setSecondModalOpen(true);
    setTimeout(() => {
      setSecondModalOpen(false);
      navigate("/");
    }, 3000);
  };

  return (
    <div className="flex flex-col px-36 justify-center w-[90%]  h-screen">
      <h1 className="font-medium text-primary-500 text-[30px] mb-4">
        Non-Winners Message
      </h1>
      <MessageForm value={textAreaValue} onChange={handleTextAreaChange} />
      <Button onClick={handleClick} className="self-end">
        Send Message
      </Button>
      <SuccessModal
        isOpen={secondModalOpen}
        onClose={() => setSecondModalOpen(false)}
      />
    </div>
  );
};

export default MessagePage;
