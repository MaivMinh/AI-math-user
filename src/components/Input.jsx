import React from "react";
import { CalendarOutlined, FieldTimeOutlined } from "@ant-design/icons"; // Import default icon or your preferred icon

const Input = ({
  type,
  name,
  label,
  autoFocus,
  value,
  onChange,
  icon: CustomIcon,
}) => {
  // Determine what icon to use - either passed icon or default Calendar icon
  const IconComponent = CustomIcon || CalendarOutlined;

  return (
    <div className="relative z-0 w-full my-1 group">
      <input
        autoFocus={autoFocus !== undefined ? true : false}
        type={type} // Use the type prop instead of hardcoding "date"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none dark:text-[#85A900] font-semibold dark:border-gray-600 dark:focus:border-[#85A900] focus:outline-none focus:ring-0 focus:border-[#85A900] peer date-input-custom"
        placeholder=" "
        required
        style={{
          // Hide default calendar icon
          colorScheme: "none",
        }}
      />

      {/* Display custom icon for date inputs */}
      {type === "date" && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <FieldTimeOutlined
            style={{
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
              color: "#B18CFE",
              fontSize: "1rem",
            }}
          />
        </div>
      )}

      <label
        htmlFor={name}
        className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#85A900] peer-focus:dark:text-[#85A900] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>

      {/* Add global style to remove calendar icon across browsers */}
      <style jsx>{`
        /* Hide calendar icon in Chrome, Safari, Edge, Opera */
        input[type="date"]::-webkit-calendar-picker-indicator {
          display: none;
          -webkit-appearance: none;
        }

        /* Firefox */
        input[type="date"] {
          -moz-appearance: textfield;
        }

        /* Hide clear button in Edge */
        input[type="date"]::-ms-clear {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Input;
