import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormField, Loader } from "../components";
import { contract } from "../utils/constants";
import { prepareContractCall, sendTransaction, resolveMethod } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { ethers } from "ethers";

const CreateEvent = () => {

  const { mutate: sendTransaction, isPending } = useSendTransaction();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    details: "",
    ticketPrice: "",
    date: "",
    // time: "",
    totalSeats: "",
    image: "",
    // location: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior (reload the page after form submission)
    e.preventDefault();

    console.log(form);
    console.log(contract)

    const params = [
      form.name,
      form.details,
      ethers.parseEther(form.ticketPrice),  // Convert ticket price to Wei
      new Date(form.date).getTime(),  // Assuming you need the timestamp in milliseconds
      parseInt(form.totalSeats),  // Convert totalSeats to a number if it's not already
      form.image,
    ];
    setIsLoading(true);
    const transaction = prepareContractCall({
      contract,
      method: resolveMethod("createConcert"),
      params: params,
    });
    
    sendTransaction(transaction);
    console.log(transaction)
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}

      <div className="w-full">
        <h1 className="font-epilogue font-bold sm:text-[28px] text-[18px] leading-[38px] text-[#2563eb]">
          Create an Concert
        </h1>
        <div className="border-t-2 border-[#9ca3af] mt-6"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[40px] flex flex-col gap-[30px]"
      >
        <div className="mb-[10px]">
          <p className="text-[#4b5563] font-medium text-[14px]">
            <span className="text-[#dc2626] font-bold">*</span> indicates a
            required field
          </p>
        </div>

        <FormField
          labelName={
            <span>
              Concert Name: <span className="text-[#dc2626] font-bold">*</span>
            </span>
          }
          placeholder="Write an Concert Name"
          inputType="text"
          value={form.name}
          handleChange={(e) => handleFormFieldChange("name", e)}
        />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName={
              <span>
                Date: <span className="text-[#dc2626] font-bold">*</span>
              </span>
            }
            placeholder="Date"
            inputType="date"
            value={form.date}
            handleChange={(e) => handleFormFieldChange("date", e)}
          />

          {/* <FormField
            labelName={
              <span>
                Start Time: <span className="text-[#dc2626] font-bold">*</span>
              </span>
            }
            placeholder="time"
            inputType="time"
            value={form.time}
            handleChange={(e) => handleFormFieldChange("time", e)}
          /> */}

          <FormField
            labelName={
              <span>
                Total Seats: <span className="text-[#dc2626] font-bold">*</span>
              </span>
            }
            placeholder="Write the total seats"
            inputType="text"
            value={form.totalSeats}
            handleChange={(e) => handleFormFieldChange("totalSeats", e)}
          />
        </div>

        <FormField
          labelName={
            <span>
              Ticket Price: <span className="text-[#dc2626] font-bold">*</span>
            </span>
          }
          placeholder="Write the ticket price"
          inputType="text"
          value={form.ticketPrice}
          handleChange={(e) => handleFormFieldChange("ticketPrice", e)}
        />

        <FormField
          labelName={
            <span>
              Event Image: <span className="text-[#dc2626] font-bold">*</span>
            </span>
          }
          placeholder="Place the image URL of the event"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

        <FormField
          labelName={
            <span>
              Event Details: <span className="text-[#dc2626] font-bold">*</span>
            </span>
          }
          placeholder="Write the event details (e.g. Important Notes, Terms of Sales & Terms and Conditions)"
          isTextArea
          value={form.details}
          handleChange={(e) => handleFormFieldChange("details", e)}
        />

        <div className="flex justify-center items-center mt-[30px]">
          <button
            type="submit"
            className="font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-14 rounded-[10px] bg-[#1d4ed8]"
          >
            Submit new event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
