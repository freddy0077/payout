// components/Header.tsx
import React from "react";
import Dropdown from "../Dropdown";
import Button from "../Buttons/Button";

interface HeaderProps {
  title: string;
  selectedOption: string;
  options: string[];
  onOptionSelected: (option: string) => void;
  onButtonClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  selectedOption,
  options,
  onOptionSelected,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <h1 className="text-2xl font-medium text-primary-500">{title}</h1>
      <div className="flex flex-row items-center justify-center space-x-6">
        <Dropdown
          id="dropdown"
          label={`${selectedOption}`}
          options={options}
          selectedOption={selectedOption}
          onOptionSelected={onOptionSelected}
          className="w-[200px] h-auto"
        />
        <Button onClick={onButtonClick} className="w-[200px] h-auto">
          Pay All
        </Button>
      </div>
    </div>
  );
};

export default Header;
