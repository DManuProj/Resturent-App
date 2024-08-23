import React from "react";
import { FaHome, FaTools, FaInfoCircle } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";

const Header = () => {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <FaHome />,
    },
    {
      name: "Service",
      link: "/service",
      icon: <FaTools />,
    },
    {
      name: "Offers",
      link: "/offers",
      icon: <MdLocalOffer />,
    },
    {
      name: "Gallery",
      link: "/gallery",
      icon: <IoMdPhotos />,
    },
    {
      name: "About Us",
      link: "/about",
      icon: <FaInfoCircle />,
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center bg-opacity-50 backdrop-blur-md justify-between px-16 py-2 bg-gray-800 text-white">
      {/* Logo */}
      <div className="flex items-center">
        <div>logo</div>
      </div>

      {/* Navigation Center */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-6 ">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center gap-2 px-2 hover:text-gray-400"
            >
              <div>{item.icon}</div>
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sign In Button */}
      <div className="ml-auto">
        <button className="bg-black text-white px-6 py-2 rounded-2xl">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Header;
