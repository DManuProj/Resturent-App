import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomeLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen  w-11/12 mx-auto">
      <header>
        <Header />
      </header>
      <main className="flex-grow pt-16 ">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLayout;
