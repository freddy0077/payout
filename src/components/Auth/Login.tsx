// Login.tsx
import React, {useEffect, useState} from 'react';
import LoginForm from './LoginForm';
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../_store";
import {useNavigate} from "react-router-dom";
import Loader from "../Loader"; // Update import path according to your project

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // @ts-ignore
    const {error, isLoading}  = useSelector(x => x.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        // @ts-ignore
        dispatch(authActions.login({email, password})).then((res) => {
            console.log("Res", res)
            if (res.type === "auth/login/fulfilled"){
                setTimeout(() => {
                    navigate("/start")
                }, 3000)
            }
        })
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                {isLoading && <Loader/> }
                <LoginForm
                    email={email}
                    onEmailChange={handleEmailChange}
                    password={password}
                    onPasswordChange={handlePasswordChange}
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    )
}

export default Login;
