// components/PayoutForm.tsx
import React, { FC } from "react";
import Dropdown from "./Dropdown";
import DatePickerComponent from "./DatePicker";
import InputField from "./InputField";
import { OTPInput } from "./OTPInput";
import {useSelector} from "react-redux";

interface StartFormProps {
  selectedOption: string;
  onOptionSelected: (option: string) => void;
  onOTPChange: (value: string) => void;
  onOTPComplete: (value: string) => void;
  onDrawNumberChange?: (value: string) => void;
  drawNumber: string
  values?: string[]
}

const StartForm: FC<StartFormProps> = ({
  selectedOption,
  onOptionSelected,
  onOTPChange,
  onOTPComplete,
  onDrawNumberChange,
    drawNumber,
    values
}) => {
  const options = ["Classic", "Mega"];
  // const {drawResults} = useSelector(state => state.tickets)
    console.log("Values from Start from", values)
  return (
    <div className="flex flex-col w-[90%] justify-center items-center h-full">
      <h1 className="font-medium text-primary-500 text-2xl text-center">
        Start Payout Process
      </h1>
      <DatePickerComponent
        id="Date"
        label="Date"
        placeholder="Choose a date"
        requested
      />

        <InputField
            id="drawNumber"
            label="Draw number"
            type="text"
            // onChange={onDrawNumberChange}
            onBlur={onDrawNumberChange}
            placeholder="Enter draw number"
            required
        />

      <OTPInput
        // values={drawResults?.results?.split("-")}
        values={values}
        id="OTP"
        label="Draw Results"
        length={6}
        onChange={onOTPChange}
        onComplete={onOTPComplete}
        requested
      />
        {/*<h2>{values?.join("-")}</h2>*/}
    </div>
  );
};

export default StartForm;
