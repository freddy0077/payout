// Login.tsx
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../_store";
import {useNavigate} from "react-router-dom";
import ChangePasswordForm from "./ChangePasswordForm";


const Login: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // @ts-ignore
    const {error}  = useSelector(x => x.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const onConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    }

    const handleSubmit = () => {
        // @ts-ignore
        dispatch(authActions.changePassword({ password })).then((res) => {
            console.log("Res", res)
            if (res.type === "auth/changePassword/fulfilled"){
                navigate("/login")
            }
        })
    }

    return (
        <>

            <div className="flex justify-center items-center min-h-screen">
                <ChangePasswordForm
                    password={password}
                    onPasswordChange={handlePasswordChange}
                    onSubmit={handleSubmit}
                    confirmPassword={confirmPassword}
                    onConfirmPasswordChange={onConfirmPasswordChange}
                />
            </div>
        </>
    )
}

export default Login;
