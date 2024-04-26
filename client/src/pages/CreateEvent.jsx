import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormField, Loader } from "../components";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    image: "",
    details: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior (reload the page after form submission)
    e.preventDefault();

    console.log(form);
  };

  return (
    <div className="flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}

      <div className="w-full">
        <h1 className="font-epilogue font-bold sm:text-[28px] text-[18px] leading-[38px] text-[#2563eb]">
          Create an Event
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
              Event Title: <span className="text-[#dc2626] font-bold">*</span>
            </span>
          }
          placeholder="Write an event title"
          inputType="text"
          value={form.title}
          handleChange={(e) => handleFormFieldChange("title", e)}
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

          <FormField
            labelName={
              <span>
                Start Time: <span className="text-[#dc2626] font-bold">*</span>
              </span>
            }
            placeholder="time"
            inputType="time"
            value={form.time}
            handleChange={(e) => handleFormFieldChange("time", e)}
          />
        </div>

        <FormField
          labelName={
            <span>
              Location: <span className="text-[#dc2626] font-bold">*</span>
            </span>
          }
          placeholder="Write the event location"
          inputType="text"
          value={form.location}
          handleChange={(e) => handleFormFieldChange("location", e)}
        />

        <FormField
          labelName={
            <span>
              Event Image: <span className="text-[#dc2626] font-bold">*</span>
            </span>
          }
          placeholder="Place the image URL of the event"
          inputType="url"
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
