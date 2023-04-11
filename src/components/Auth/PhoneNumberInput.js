import React, { useState } from "react";
import Select from "react-dropdown-select";
import countrylist from "../../countrylist.json";

const PhoneNumberInput = ({ setPhoneNumber }) => {
  const [selectedValue, setSelectedValue] = useState({
    value: "+91",
    label: "India",
  });
  // const options = [
  //   { value: "+91", label: "India" },
  //   { value: "+41", label: "United Kingdom" },
  //   { value: "+1", label: "United States" },
  //   { value: "+2", label: "Andorra" },
  //   { value: "+3", label: "Afghanistan" },
  //   { value: "+4", label: "Antigua and Barbuda" },
  //   { value: "+5", label: "Anguilla" },
  //   { value: "+6", label: "Albania" },
  //   { value: "+7", label: "Armenia" },
  //   { value: "+8", label: "Angola" },
  //   { value: "+9", label: "Antarctica" },
  //   { value: "+10", label: "Argentina" },
  // ];
  const options = countrylist;

  const customContentRenderer = ({ state }) => {
    return (
      <div className="p-2 w-10">
        {state?.values[0]?.value || selectedValue?.value}
      </div>
    );
  };

  const customDropdownRenderer = ({ props, state, methods }) => {
    const regexp = new RegExp(state.search, "i");
    return (
      <div className="text-black p-2 backdrop-blur-3xl rounded-md ">
        <div className="dropdown-search-input">
          <span class="absolute top-8 left-7 text-poddl-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            className="py-2 pl-11 rounded-lg bg-poddl-900"
            value={state.search}
            onChange={methods.setSearch}
          />
        </div>
        <div className="dropdown-search-options scrollbar-thin scrollbar-thumb-boring scrollbar-thumb-rounded-full">
          {props.options
            .filter((item) => regexp.test(item[props.searchBy] || item.label))
            .map((option) => (
              <div
                className="m-2.5 py-2 flex justify-between border-b border-poddl-700"
                key={option.value}
                onClick={() => methods.addItem(option)}
              >
                <p>{option.value}</p>
                <p>{option.label}</p>
              </div>
            ))}
        </div>
      </div>
    );
  };
  return (
    <div className="mt-4">
      <p className="py-3 ">Enter your Phone Number</p>
      <div className="flex">
        <Select
          options={options}
          contentRenderer={customContentRenderer}
          dropdownRenderer={customDropdownRenderer}
          onChange={(values) => {
            setSelectedValue(values);
          }}
          value={options.find((e) => e.value === selectedValue.value)}
          style={{
            borderRadius: "12px",
            border: "1px solid #B3BAE7",
            boxShadow: "none",
            background: "#1C1E31",
          }}
        />
        <input
          className="bg-poddl-900 rounded-xl w-full p-2 ml-4 text-xl focus:outline-none border border-poddl-600"
          placeholder="9876543210"
          type="number"
          name="phoneNumber"
          onChange={(e) => setPhoneNumber(selectedValue.value + e.target.value)}
        />
      </div>
    </div>
  );
};

export default PhoneNumberInput;
