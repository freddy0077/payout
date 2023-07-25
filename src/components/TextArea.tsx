// components/TextArea.tsx
import React, { ChangeEvent, FC } from "react";

interface TextAreaProps {
  id: string;
  name?: string;
  label?: string;
  required?: boolean;
  rows?: number;
  cols?: number;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  disabled?: boolean;
}

const TextArea: FC<TextAreaProps> = ({
  id,
  name,
  label,
  required = false,
  rows = 4,
  cols = 50,
  placeholder,
  value,
  onChange,
  className,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`resize-none outline-none p-2 ${
          disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"
        } ${className}`}
        disabled={disabled}
      />
    </div>
  );
};

export default TextArea;
