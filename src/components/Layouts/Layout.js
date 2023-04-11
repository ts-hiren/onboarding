import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen layout">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
