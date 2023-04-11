import { flatten } from "lodash";
import React, { useState, useMemo, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Select from "react-dropdown-select";
import DomainDetail from "./DomainDetails";
import { firestoreDB } from "../../App";
import { doc, setDoc } from "firebase/firestore"; 


const UserDetailsForm = () => {
  // console.log("DomainDetail ", DomainDetail);
  const [selectedCategory] = useState([]);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  const storeToFirebase = async (formData) => {
    if (!formData.uid) {
      alert("User not logged in");
      return;
    }
    await setDoc(doc(firestoreDB, 'accounts', formData.uid), formData);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
        setUser(null);
      }
    });
  }, [auth]);

  // reference object
  // {fullname, email, domains: {domain1, domain2}, expertise: {exp1, exp2}}
  const [formData, setFormData] = useState({
    phone: "",
    uid: "",
    firstName: "",
    lastName: "",
    domains: [],
    expertise: [],
    email: "",
    gender: "",
    title: "",
    birthday: "",
    idType: "",
    idNumber: "",
    idExpiry: "",
    profession: "",
    experience: "",
    education: "",
    freelanceExperience: "",
    avatar: "",
    country: "IN",
    taxReportLink: "",
    linkedin: "",
    twitter: "",
    website: "",
    taxReport: "loading",
    earnings: "0.0",
    taxSummary: "0.0",
    glimSavings: "0.0",
    totalIncome: "0.0",
    totalExpense: "0.0",
    referral: "",
    username: "",
    status: "PENDING",
    areaOfExpertise: "active",
  });

  useEffect(() => {
    if (user) {
      setFormData({ ...formData, phone: user?.phoneNumber, uid: user?.uid });
    }
  }, [user]);

  const categoryOptions = useMemo(
    () =>
      DomainDetail.map((d) => ({
        value: d.name,
        label: d.name,
      })),
    []
  );
  const subCategoryOptions = useMemo(() => {
    const opts = DomainDetail.filter((d) => {
      return formData.domains.map((c) => c.value).includes(d.name);
    }).map((c) => c.items);
    return flatten(opts).map((c) => ({
      value: c,
      label: c,
    }));
  }, [formData.domains]);

  const customContentRenderer = ({ option, state, methods }) => {
    return (
      <div className="p-2 w-full">
        <div
          className={`${
            state.values.length ? "border-b pb-2.5" : "text-poddl-placeHolder"
          } border-poddl-500`}
        >
          {state.values.length
            ? `${state.values.length} selected`
            : "Select one or multiple options"}
        </div>
        <div className="flex flex-wrap mt-1">
          {state?.values.map((opt, index) => (
            <p
              className="bg-poddl-300 whitespace-nowrap overflow-hidden text-ellipsis px-2 rounded-md m-1 flex items-center cursor-default"
              key={index}
            >
              {opt.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 pl-1 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={(ev) => {
                  methods.removeItem(ev, opt, true);
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </p>
          ))}
        </div>
      </div>
    );
  };

  const customDropdownRenderer = ({ props, state, methods }) => {
    const regexp = new RegExp(state.search, "i");

    return (
      <div className="text-black p-2 backdrop-blur-3xl rounded-md ">
        <div className="dropdown-search-input">
          <span className="absolute top-8 left-7 text-poddl-500">
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
            placeholder="Search"
          />
        </div>
        <div className="dropdown-search-options scrollbar-thin scrollbar-thumb-boring scrollbar-thumb-rounded-full">
          {props.options
            .filter((item) => regexp.test(item[props.searchBy] || item.label))
            .map((option) => {
              return (
                <div
                  className="m-2.5 flex items-center py-2 border-b border-poddl-700"
                  key={option.value}
                  onClick={() => methods.addItem(option)}
                >
                  <input
                    type="checkbox"
                    onChange={() => methods.addItem(option)}
                    checked={state.values.indexOf(option) !== -1}
                  />
                  <p className="pl-4">{option.label}</p>
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto bordered-card-container my-28">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          storeToFirebase(formData);
        }}
      >
        <div className="bordered-card rounded-2xl p-10">
          <p className="text-lg">One last step</p>
          <p className="text-2xl font-medium mb-4">
            Help us get to know you better
          </p>
          <div className="mt-8">
            <p className="py-2">Enter your Full Name</p>
            <input
              required
              className="bg-poddl-900 rounded-xl w-full p-3 text-base focus:outline-none border border-poddl-placeHolder"
              placeholder="Full Name"
              type="text"
              name="firstName"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <p className="py-2">Enter your Email</p>
            <input
              required
              className="bg-poddl-900 rounded-xl w-full p-3 text-base focus:outline-none border border-poddl-placeHolder"
              placeholder="Email"
              type="email"
              name="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <p className="py-2">Select your Domain</p>
            <Select
              required
              multi
              options={categoryOptions}
              contentRenderer={customContentRenderer}
              dropdownRenderer={customDropdownRenderer}
              // onChange={(values) => setSelectedCategory(values)}
              onChange={(values) =>
                setFormData({ ...formData, domains: values })
              }
              value={selectedCategory}
              placeholder="Select one or multiple options"
              style={{
                borderRadius: "12px",
                border: "1px solid #B3BAE7",
                boxShadow: "none",
                background: "#1C1E31",
              }}
            />
          </div>
          <div className="mt-4">
            <p className="py-2">Select your Expertise</p>
            <Select
              required
              multi
              options={subCategoryOptions}
              contentRenderer={customContentRenderer}
              dropdownRenderer={customDropdownRenderer}
              onChange={(values) =>
                setFormData({ ...formData, expertise: values })
              }
              placeholder="Select one or multiple options"
              style={{
                borderRadius: "12px",
                border: "1px solid #B3BAE7",
                boxShadow: "none",
                background: "#1C1E31",
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-poddl-disabledButton w-full  mt-10 h-11 rounded-xl"
          >
            Get Started!
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDetailsForm;
