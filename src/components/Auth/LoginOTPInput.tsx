import React, { ChangeEvent, useEffect, useRef, useState } from "react";

interface OTPInputProps {
    id: string;
    label: string;
    requested?: boolean;
    length: number;
    onChange: (value: string) => void;
    onComplete?: (value: string) => void;
}

export const LoginOTPInput: React.FC<OTPInputProps> = ({
                                                      length,
                                                      onChange,
                                                      onComplete,
                                                      id,
                                                      label,
                                                      requested,
                                                  }) => {
    const [inputValues, setInputValues] = useState<string[]>(
        Array(length).fill("")
    );
    const inputs = useRef<HTMLInputElement[]>([]);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.target.value;

        if (value === "") {
            return;
        }

        if (index < length - 1) {
            inputs.current[index + 1].focus();
        }

        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
        const otpValue = newInputValues.join("");
        onChange(otpValue);

        if (index === length - 1 && onComplete && otpValue.length === length) {
            onComplete(otpValue);
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace") {
            if (index > 0) {
                inputs.current[index - 1].focus();
            }
        }
    };

    useEffect(() => {
        inputs.current[0].focus();
    }, []);

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
                        maxLength={1}
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
                        value={inputValues[index]}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                ))}
            </div>
        </div>
    );
};
