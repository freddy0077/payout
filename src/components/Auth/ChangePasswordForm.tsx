import React, {FC, useState} from 'react';
import InputField from '../InputField';
import Button from "../Buttons/Button";
import {useSelector} from "react-redux"; // Update import path according to your project

interface ChangePasswordFormProps {
    password: string;
    confirmPassword: string
    onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onConfirmPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
                                                             password,
                                                             onPasswordChange,
                                                             confirmPassword,
                                                             onConfirmPasswordChange,
                                                             onSubmit,
                                       }) => {



    // const onSubmitHandler = () => {
    //     if (!isPasswordComplex(password)) {
    //         alert("Password is not complex enough!")
    //     } else {
    //         onSubmit();
    //     }
    // };

    // @ts-ignore
    const {error} = useSelector( x => x.auth)

    return (
        <div className="flex flex-col w-[90%] justify-center items-center h-full">
            <h1 className="font-medium text-primary-500 text-2xl text-center">
                Change Password
            </h1>

            <InputField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={onPasswordChange}
                placeholder="Enter your password"
                required
            />

            <InputField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                placeholder="Confirm password"
                required
            />

            <p className={`text-red-700`}>{error?.message}</p>

            <br/>

            <Button className="w-[500px]" onClick={onSubmit}>Change</Button>

        </div>
    );
};

export default ChangePasswordForm;
