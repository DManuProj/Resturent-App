import React from "react";
import Header from "../components/Header";

const HomeLayout = ({ children }) => {
  return (
    <div className="bg-slate-700 min-h-screen w-11/12 mx-auto p-0">
      <div>
        <Header />
      </div>
      <div>{children}</div>
      <div className="">footer</div>
    </div>
  );
};

export default HomeLayout;
