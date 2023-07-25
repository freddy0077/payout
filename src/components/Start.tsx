import React, { useEffect, useState, useCallback } from "react";
import Button from "../components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ticketActions } from "../_store";
import StartForm from "./StartForm";
import Modal from 'react-modal';
import Loader from "./Loader";

const DOWNLOAD_TICKETS_BASE_URL = "http://18.193.168.136:5000";

Modal.setAppElement('#root');

const Start = () => {
    const [name, setName] = useState("");
    const [selectedOption, setSelectedOption] = useState("Classic");
    const [modalOpen, setModalOpen] = useState(false);
    const [values, setValues] = useState([]);
    const [drawNumber, setDrawNumber] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);
    const {drawResults,winnings, loading, error}  = useSelector((state) => state.tickets);
    const [sumWinnings, setSumWinnings] = useState(0)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const downloadTickets = useCallback(() => {
        const paramValues = {
            drawNo: drawNumber,
        };
        const query = '?' + new URLSearchParams(paramValues).toString();
        const url = `${DOWNLOAD_TICKETS_BASE_URL}/export-winning-tickets${query}`;
        setTimeout(() => {
            window.location.href = url;
        },1000);
    }, [drawNumber]);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleNavigate = () => {
        closeModal();
        // navigate("/wizard");
    };

    const makePayments = (serial_number) => {
        dispatch(ticketActions.makePayment(serial_number)).then((res) => {
            if (res?.type?.includes( "fulfilled")){
                setTimeout(() => {
                    dispatch(ticketActions.getWinnings(drawNumber))
                },2000)
            }
        })
    }

    const handleOTPChange = useCallback((value) => {
        console.log("OTP Value:", value);
    }, []);

    const handleOTPComplete = useCallback((value) => {
        console.log("OTP Completed:", value);
    }, []);

    const handleDrawNumber = useCallback((value) => {
        const newDrawNumber = value.target.value;
        setDrawNumber(newDrawNumber);
        dispatch(ticketActions.getDraw(newDrawNumber));
        dispatch(ticketActions.getWinnings(newDrawNumber))
        console.log("Draw Number Value:", newDrawNumber);
    }, [dispatch]);

    useEffect(() => {
        if(!drawNumber) {
            setDataLoaded(true)
            return
        }
        dispatch(ticketActions.getDraw(drawNumber))

    }, [drawNumber, dispatch]);

    useEffect(() => {
        if(drawResults?.results){
            const newValues = drawResults.results.split("-");
            setValues(newValues);
        }

    }, [drawResults])

    useEffect(() => {
        let amounts = 0;
        winnings?.tickets?.forEach((item) => {
            if (item.amountWon){
                const amountWon = Number(item.amountWon);
                amounts += amountWon;
            }
        });

        console.log(amounts)
        setSumWinnings(amounts)
    },[winnings])

    useEffect(() => {
        setValues(null)
    },[error,dispatch])

    return (
        <div className="flex flex-col justify-center items-center h-full w-full">
            {
                loading && <Loader />

            }
            <div className="flex flex-col w-full items-center justify-center">
                <>
                    <StartForm
                        values={values}
                        selectedOption={selectedOption}
                        onOptionSelected={setSelectedOption}
                        onOTPChange={handleOTPChange}
                        onOTPComplete={handleOTPComplete}
                        onDrawNumberChange={handleDrawNumber}
                        drawNumber={""}
                    />

                    <Button onClick={downloadTickets} className="w-[500px]">
                        Download Winners
                    </Button>
                    <br/>

                    <Button onClick={openModal} className="w-[500px]">
                        Start Payments
                    </Button>
                </>

                <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    className="absolute p-4 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded shadow-lg bg-white"
                    contentLabel="Payment Confirmation Modal"
                >
                    <div className="flex items-center justify-start mb-4">
                        <h2 className="text-4xl font-semibold text-a70000">
                            Payment Confirmation
                        </h2>
                        <span className="ml-4 px-3 py-1 text-xl font-bold text-white bg-red-700 rounded-full">
    GHS {sumWinnings}
  </span>
                    </div>


                    <div className="overflow-auto max-h-96">
                        <table className="table-auto border-collapse border border-gray-200 w-full text-center">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 bg-a70000 text-[#a70000]">No.</th>
                                <th className="px-4 py-2 bg-a70000 text-[#a70000]">MSISDN</th>
                                <th className="px-4 py-2 bg-a70000 text-[#a70000]">Serial No.</th>
                                <th className="px-4 py-2 bg-a70000 text-[#a70000]">Encrypted Serial No.</th>
                                <th className="px-4 py-2 bg-a70000 text-[#a70000]">Game details</th>
                                <th className="px-4 py-2 bg-a70000 text-[#a70000]">Amount paid(GHS)</th>
                                <th className="px-4 py-2 bg-a70000 text-[#a70000]">Amount Won (GHS)</th>
                                <th className="px-4 py-2 bg-a70000 text-[#a70000]">Status</th>
                                <th className="px-4 py-2 bg-a70000 text-[#a70000]">Action</th>
                            </tr>
                            </thead>

                            <tbody>
                            {winnings?.tickets?.map((payment, index) => (
                                <tr key={payment.id} className=" font-bold">
                                    <td className="border px-4 py-2">{index+1}</td>
                                    <td className="border px-4 py-2">{payment.MSISDN}</td>
                                    <td className="border px-4 py-2">{payment.serialNo}</td>
                                    <td className="border px-4 py-2"><small>{payment.encryptedSerialNumber}</small></td>
                                    <td className="border px-4 py-2">{payment.ticketMessage}</td>
                                    <td className="border px-4 py-2">{payment.combinationAmount}</td>
                                    <td className="border px-4 py-2">{payment.amountWon}</td>
                                    <td className="border px-4 py-2"><i>{payment?.winningsPaid === "yes" ?  "paid" : "not paid"}</i></td>
                                    <td className="border px-4 py-2 flex justify-center">
                                        {
                                            !payment?.winningsPaid &&
                                            <button onClick={() => {makePayments(payment?.serialNo)}} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300">
                                                Pay
                                            </button>
                                        }
                                    </td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={closeModal} className="mr-2 bg-gray-200 hover:bg-gray-300 text-a70000 font-semibold py-2 px-4 rounded transition-colors duration-300">
                            Cancel
                        </button>

                        {/*<button onClick={handleNavigate} className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300 mr-2">*/}
                        {/*    Check payment status*/}
                        {/*</button>*/}

                        <button onClick={makePayments} className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300">
                            Make payments
                        </button>

                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Start;
