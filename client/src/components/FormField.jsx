import React from "react";

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[15px] leading-[22px] text-[#1e40af] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          input
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[2px] border-[#1d4ed8] bg-transparent font-epilogue font-medium text-[#111827] text-[14px] placeholder:text-[#9ca3af] placeholder:font-normal rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[2px] border-[#1d4ed8] bg-transparent font-epilogue font-medium text-[#111827] text-[14px] placeholder:text-[#9ca3af] placeholder:font-normal rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  );
};

export default FormField;
