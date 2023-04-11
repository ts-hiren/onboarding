import React from "react";

const UserSelectionForm = ({ setShowLogInForm }) => {
  return (
    <div className="container mx-auto bordered-card-container my-28">
      <div className="px-3 pb-3">
        <i className="fas fa-arrow-left px-3 cursor-pointer" /> Back to main
        site
      </div>
      <div className="bordered-card rounded-2xl p-10">
        <p className="text-lg font-medium mb-4">Sign in as a</p>
        <div
          className="bg-poddl-100 border border-poddl-200 rounded-2xl p-4 mb-4 cursor-pointer"
          onClick={() => setShowLogInForm("loginForm")}
        >
          <p className="p-1">Freelancer or Creator</p>
          <div className="d-flex flex">
            <p className="p-1">
              You are sole worker and need to track payments, draft taxes
            </p>
            <i className="fas fa-arrow-right" />
          </div>
        </div>
        <div
          className="bg-poddl-100 border border-poddl-200 rounded-2xl p-4 cursor-pointer"
          onClick={() => setShowLogInForm("loginForm")}
        >
          <p className="p-1">Client or Business</p>
          <div className="d-flex flex gap-3">
            <p className="p-1">
              You manages other freelancers or an owner of a small business
            </p>
            <i className="fas fa-arrow-right" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelectionForm;
