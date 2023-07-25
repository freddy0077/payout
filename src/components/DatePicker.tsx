import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import tw from "twin.macro";
import calender from "../assets/images/calendar.svg";

interface DatePickerProps {
  id: string;
  label: string;
  requested?: boolean;
  placeholder: string;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({
  id,
  label,
  requested,
  placeholder,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const CustomInput: React.FC<{ onClick: () => void; value: string }> = ({
    onClick,
    value,
  }) => (
    <button
      onClick={onClick}
      className="flex flex-row text-sm justify-between items-center border rounded-xl border-stroke px-4 py-5 w-[500px] bg-white text-gray-600 focus:outline-none"
    >
      {value}
      <img src={calender} alt="" />
    </button>
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-gray-700 font-book mb-2 text-sm"
      >
        {label}
        {requested ? (
          <span className="ml-2 text-lg text-primary-400 font-medium">*</span>
        ) : null}
      </label>
      <div className="w-full flex justify-center">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          customInput={
            <CustomInput
              value={selectedDate ? format(selectedDate, "P") : ""}
              onClick={() => console.log("Button clicked")}
            />
          }
          dateFormat="P"
        />
      </div>
    </div>
  );
};

export default DatePickerComponent;

// value

// value={selectedDate ? format(selectedDate, "P") : ""}
