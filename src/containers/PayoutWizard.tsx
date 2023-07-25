// PayoutWizard.tsx
import React, {useEffect, useState} from "react";
import Button from "../components/Buttons/Button";
import TextButton from "../components/Buttons/TextButton";
import { useNavigate } from "react-router-dom";
import CustomModal, { ModalSize } from "../components/Modals/Modal";
import PayoutForm from "../components/PayoutForm";
import {useDispatch} from "react-redux";
import {ticketActions} from "../_store";
import UserTable from "./UserTable";

const PayoutWizard = () => {
    const [name, setName] = useState("");
    const options = ["Classic", "Mega"];
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [values, setValues] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false); // New state variable
    const [drawInfo, setDrawInfo] = useState({})
    const [modalSize, setModalSize] = useState<ModalSize>("md");

    const usersData = [
        [
            { id: 1, name: "John Doe", email: "john@example.com" },
            { id: 2, name: "John Doe", email: "john@example.com" },
            // Add more users for table 1
            ...Array.from({ length: 28 }, (_, i) => ({
                id: i + 3,
                name: `User ${i + 3}`,
                email: `user${i + 3}@example.com`,
            })),
        ],

        [
            { id: 31, name: "Mark Smith", email: "mark@example.com" },
            { id: 32, name: "Sara Johnson", email: "mark@example.com" },
            // Add more users for table 2
            ...Array.from({ length: 28 }, (_, i) => ({
                id: i + 33,
                name: `User ${i + 33}`,
                email: `user${i + 33}@example.com`,
            })),
        ],

        [
            { id: 61, name: "Tom Brown", email: "tom@example.com" },
            { id: 62, name: "Lucy White", email: "lucy@example.com" },
            // Add more users for table 3
            ...Array.from({ length: 28 }, (_, i) => ({
                id: i + 63,
                name: `User ${i + 63}`,
                email: `user${i + 63}@example.com`,
            })),
        ],
        [
            { id: 61, name: "Tom Brown", email: "tom@example.com" },
            { id: 62, name: "Lucy White", email: "lucy@example.com" },
            // Add more users for table 3
            ...Array.from({ length: 28 }, (_, i) => ({
                id: i + 63,
                name: `User ${i + 63}`,
                email: `user${i + 63}@example.com`,
            })),
        ],
    ];


  const dispatch = useDispatch()

  const openModal = (size: ModalSize) => {
    setModalSize(size);
    setModalOpen(true);
  };

  const handleOptionSelected = (option: string) => {
    setSelectedOption(option);
  };

  const handleNavigate = () => {
    navigate("/ticket");
  };

  const handleOTPChange = (value: string) => {
    console.log("OTP Value:", value);
  };

  const handleOTPComplete = (value: string) => {
    console.log("OTP Completed:", value);
  };

  useEffect(() => {
      // @ts-ignore
      dispatch(ticketActions.getDraw()).then((res: any) => {
          setValues(res.payload?.results?.split(","));
          setDataLoaded(true); // Set dataLoaded to true after setting values
      });

      // @ts-ignore
      dispatch(ticketActions.getSettings()).then((res: any) => {
          console.log("Settings object", res.payload)
          setDrawInfo(res.payload.data[0]?.draw_info)
          console.log("Settings draw", drawInfo)

      })
  }, [])


  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="flex flex-col w-full items-center justify-center">
        <PayoutForm
          selectedOption={selectedOption}
          onOptionSelected={handleOptionSelected}
          name={name}
          onNameChange={(event) => {
            setName(event.target.value)
            // @ts-ignore
              dispatch(ticketActions.setGameType(event.target.value))
          }}
          onOTPChange={handleOTPChange}
          onOTPComplete={handleOTPComplete}
        />
        <Button onClick={() => openModal("full")} className="w-[500px]">
          Preview & Download
        </Button>
      </div>

      <CustomModal
        isOpen={modalOpen}
        size={modalSize}
        onClose={() => setModalOpen(false)}
      >
        <h2 className="mb-4 text-2xl font-medium text-primary-500">
          Preview & Download
        </h2>

        <div className="flex flex-row w-full items-center justify-between">
          {/*<p>Feel free to add more content here.</p>*/}

            <div className="grid grid-rows-3 gap-4 w-full ">
                {usersData.map((users, index) => (
                    <UserTable
                        key={index}
                        data={users}
                        tableTitle={`Table ${index + 1}`}
                    />
                ))}
            </div>

          {/*<Button onClick={() => alert("Done")}>Download</Button>*/}

        </div>
      </CustomModal>


      <TextButton
        onClick={handleNavigate}
        className="flex flex-row self-end mr-16 text-xl font-book items-center text-primary-500 w-24 justify-between cursor-pointer"
      >
        Next
      </TextButton>
    </div>
  );
};

export default PayoutWizard;
