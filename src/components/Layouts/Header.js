import React from "react";

const Header = () => {
  return (
    <nav>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="/Logo.png" alt="Onboarding" />
              <p className="pl-1">Onboarding</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
