import React, { ChangeEvent } from "react";

interface CustomCheckboxProps {
  id: string;
  label?: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        className="w-4 h-4 border border-gray-300 rounded text-blue-600 focus:ring-blue-500"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="ml-2 text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};
