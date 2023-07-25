
import React, {FC, useEffect} from "react";
import { LoginOTPInput } from "./LoginOTPInput";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../_store";
import {useNavigate} from "react-router-dom";
import Button from "../Buttons/Button";


interface PayoutFormProps {
    onOTPChange: (value: string) => void;
    onOTPComplete: (value: string) => void;
}

const OTPForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // @ts-ignore
    const {isVerified} = useSelector(x => x.auth)
    console.log("Is Verified", isVerified)

    const onOTPChange = () => {}

    const onOTPComplete = (value: string) => {
        // @ts-ignore
         dispatch(authActions.verifySms({code: value})).then(() => {
             // setTimeout(() => {
                 if (isVerified){
                     console.log("Is Verified", isVerified)
                     // navigate(0)
                     return window.location.href="/start"
                 }else{

                 }
             },3000)
         // })
    }

    const onDone = () => {
        if (isVerified){
            navigate("/start")
        }
    }

    const resend = () => {

    }


    return (
        <div className="flex flex-col w-[90%] justify-center items-center h-full">
            <h1 className="font-medium text-primary-500 text-2xl text-center">
                Type OTP received
            </h1>

            <LoginOTPInput
                id="OTP"
                label="OTP"
                length={6}
                onChange={onOTPChange}
                onComplete={onOTPComplete}
                requested
            />
            {
                !isVerified && <p className={`text-red-700`}>Code is not valid!</p>

            }

            {isVerified && <Button onClick={onDone} className="w-[500px]" >Done</Button>
            }

        </div>
    );
};

export default OTPForm;
