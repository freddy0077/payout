// components/PayoutForm.tsx
import React, {FC, useEffect, useState} from "react";
import Dropdown from "./Dropdown";
import DatePickerComponent from "./DatePicker";
import InputField from "./InputField";
import { OTPInput } from "./OTPInput";
import {useDispatch, useSelector} from "react-redux";
import {ticketActions} from "../_store";

interface PayoutFormProps {
  selectedOption: string;
  onOptionSelected: (option: string) => void;
  name: string;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onOTPChange: (value: string) => void;
  onOTPComplete: (value: string) => void;
}

const PayoutForm: FC<PayoutFormProps> = ({
  selectedOption,
  onOptionSelected,
  name,
  onNameChange,
  onOTPChange,
  onOTPComplete,
}) => {


  const dispatch = useDispatch()
    //@ts-ignore
  const settings = useSelector(x => x.tickets)
  const [drawInfo, setDrawInfo] = useState({})

  console.log("Settings from slice", settings)
  useEffect(() => {
    // @ts-ignore
      dispatch(ticketActions.getSettings()).then((res) => {

      console.log("Settings object", res.payload)
      setDrawInfo(res.payload.data[0]?.draw_info)
      console.log("Settings draw", drawInfo)

    })
  },[])

    function getValue() {
        // @ts-ignore
        return drawInfo.megaOption?.find(option => option.amount === "20.0")?.drawNo || '';
    }

    function getClassicDrawNumber() {
        // @ts-ignore
        return drawInfo.classicOption?.drawNo || '';
    }

    function getMega5GHS() {
        // @ts-ignore
        return drawInfo.megaOption?.find(option => option.amount === "5.0")?.drawNo || '';
    }

    function getMega10GHS() {
        // @ts-ignore
        return drawInfo.megaOption?.find(option => option.amount === "10.0")?.drawNo || '';
    }

    return (
    <div className="flex flex-col w-[90%] justify-center items-center h-full">
      <h1 className="font-medium text-primary-500 text-2xl text-center">
        Draw Payout Process
      </h1>

      <InputField
          id="classic"
          label="Classic Draw Number"
          type="text"
          value={getClassicDrawNumber()}
          onChange={onNameChange}
          placeholder="Enter the draw number"
          required
          requested
      />

      <InputField
          id="mega5"
          label="Mega 5GHS Draw Number"
          type="text"
          value={getMega5GHS()}
          onChange={onNameChange}
          placeholder="Enter the draw number"
          required
          requested
      />

      <InputField
          id="mega10"
          label="Mega 10GHS Draw Number"
          type="text"
          value={getMega10GHS()}
          onChange={onNameChange}
          placeholder="Enter the draw number"
          required
          requested
      />

      <InputField
          id="mega20"
          label="Mega 20GHS Draw Number"
          type="text"
          value={getValue()}
          onChange={onNameChange}
          placeholder="Enter the draw number"
          required
          requested
      />

      {/*<OTPInput*/}
      {/*  id="OTP"*/}
      {/*  label="Draw Results"*/}
      {/*  length={6}*/}
      {/*  onChange={onOTPChange}*/}
      {/*  onComplete={onOTPComplete}*/}
      {/*  requested*/}
      {/*/>*/}
    </div>
  );
};

export default PayoutForm;
