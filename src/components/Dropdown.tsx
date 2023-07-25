import React, { useState } from "react";
import drop from "../assets/images/dropdown.svg";

interface DropdownProps {
  label: string;
  options: string[];
  selectedOption: string;
  onOptionSelected: (option: string) => void;
  requested?: boolean;
  id: string;
  header?: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedOption,
  onOptionSelected,
  requested,
  id,
  header,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelected = (option: string) => {
    onOptionSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left my-6">
      <div>
        <label
          htmlFor={id}
          className="block text-gray-700 font-book mb-2 text-sm"
        >
          {header}
          {requested && (
            <span className="ml-2 text-lg text-primary-400 font-medium">*</span>
          )}
        </label>
        <button
          type="button"
          className={`flex justify-between w-[500px] rounded-xl border border-stroke shadow-sm px-4 py-5 bg-white text-sm font-book text-placeholder  hover:bg-gray-50 focus:outline-none ${className}`}
          onClick={handleToggle}
        >
          {label}
          <img src={drop} alt=" Toogle Dropdown" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute z-10 right-0 mt-2 w-full py-4 px-4 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <button
                key={index}
                className={`block px-4 py-4 mb-4 text-sm text-placeholder hover:bg-primary-50 rounded-lg w-full text-left ${
                  option === selectedOption
                    ? "bg-primary-50 bg-opacity-50 text-placeholder"
                    : ""
                }`}
                role="menuitem"
                onClick={() => handleOptionSelected(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
