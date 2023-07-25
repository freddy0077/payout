import React, { ChangeEvent, useEffect, useRef, useState } from "react";

interface OTPInputProps {
  id: string;
  label: string;
  requested?: boolean;
  length: number;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  values?: string[]
}

export const OTPInput: React.FC<OTPInputProps> = ({
                                                    length,
                                                    onChange,
                                                    onComplete,
                                                    id,
                                                    label,
                                                    requested,
                                                    values=[]
                                                  }) => {

  // const [inputValues, setInputValues] = useState<string[]>(Array(length).fill("2"));
  //   const [inputValues, setInputValues] = useState<string[]>(['1', '3', '4', '5', '6', '7']);

    const [inputValues, setInputValues] = useState<string[]>(values);

    const inputs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (
      e: ChangeEvent<HTMLInputElement>,
      index: number
  ) => {
    const value = e.target.value;

    if (value === "") {
      return;
    }

    // Ensure the input is a number
    if (!(/^\d+$/.test(value))) {
      return;
    }

    if (value.length === 2 && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
    const otpValue = newInputValues.join("");
    onChange(otpValue);

    if (index === length - 1 && onComplete && otpValue.length === length * 2) {
      onComplete(otpValue);
    }
  };

  const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
  ) => {
    if (e.key === "Backspace") {
      const value = inputValues[index];
      if (value.length === 1) {
        const newInputValues = [...inputValues];
        newInputValues[index] = "";
        setInputValues(newInputValues);
      } else if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  useEffect(() => {
    inputs.current[0].focus();
  }, []);

    // useEffect(() => {
    //     setInputValues(values);
    // }, [values]);

    useEffect(() => {
        // Only update state if values from props are different than the current state
        if (JSON.stringify(inputValues) !== JSON.stringify(values)) {
            setInputValues(values);
        }
    }, [values, inputValues]); // inputValues dependency is added to keep the effect synchronized
  return (
      <div className="flex flex-col my-6">
        <label
            htmlFor={id}
            className="block text-gray-700 font-book mb-2 text-sm"
        >
          {label}
          {requested ? (
              <span className="ml-2 text-lg text-primary-400 font-medium">*</span>
          ) : null}
        </label>
        <div className="flex flex-row justify-between w-[500px] space-x-4">
          {Array.from({ length }).map((_, index) => (
              <input
                  key={index}
                  ref={(el) => (inputs.current[index] = el!)}
                  type="tel"
                  maxLength={2}
                  className="
            w-14 h-14
            text-center
            text-xl
            border
            border-stroke
            rounded-lg
            placeholder-placeholder
            focus:outline-none
            focus:shadow-outline
            focus:ring-primary-200
            focus:border-primary-200
            focus:border-2
            "
                  value={inputValues && inputValues[index]}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
              />
          ))}
        </div>
      </div>
  );
};
