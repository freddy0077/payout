// components/MessageForm.tsx
import React, { FC } from "react";
import TextArea from "../TextArea";

interface MessageFormProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const MessageForm: FC<MessageFormProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col my-4">
      <TextArea
        id="example-textarea"
        label="Message"
        required
        placeholder="Type in your message ..."
        value={value}
        onChange={onChange}
        className="w-full h-[500px] my-2 pt-4 pl-4 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default MessageForm;
