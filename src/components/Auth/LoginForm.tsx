import React, { FC } from 'react';
import InputField from '../InputField';
import Button from "../Buttons/Button";
import {useSelector} from "react-redux";
import ChangePasswordModal from "../Modals/ChangePasswordModal"; // Update import path according to your project

interface LoginFormProps {
    email: string;
    onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    password: string;
    onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

const LoginForm: FC<LoginFormProps> = ({
                                           email,
                                           onEmailChange,
                                           password,
                                           onPasswordChange,
                                           onSubmit,
                                       }) => {

    // @ts-ignore
    const {error} = useSelector( x => x.auth)

    return (
        <div className="flex flex-col w-[90%] justify-center items-center h-full">
            <h1 className="font-medium text-primary-500 text-2xl text-center">
                Login
            </h1>
            <InputField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={onEmailChange}
                placeholder="Enter your email"
                required
            />
            <InputField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={onPasswordChange}
                placeholder="Enter your password"
                required
            />

            {error?.message?.includes("Your password has expired") &&
               // <Button className="w-[500px]" onClick={onSubmit}>Login</Button>
                <ChangePasswordModal isOpen={true} onClose={() => false} />
            }
            <p className={`text-red-700`}>{error?.message}</p>

            <br/>

            <Button className="w-[500px]" onClick={onSubmit}>Login</Button>

        </div>
    );
};

export default LoginForm;
