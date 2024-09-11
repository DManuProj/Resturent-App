import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { PiBowlFoodFill } from "react-icons/pi";
import { GiNoodles } from "react-icons/gi";
import { FaHamburger } from "react-icons/fa";
import { GiCakeSlice } from "react-icons/gi";
import BannerImage from "../assets/home_banner.png";
import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();
  const navItems = [
    {
      link: "/rice",
      icon: <PiBowlFoodFill />,
    },
    {
      link: "/noodles",
      icon: <GiNoodles />,
    },
    {
      link: "/burger",
      icon: <FaHamburger />,
    },
    {
      link: "/cakes",
      icon: <GiCakeSlice />,
    },
  ];

  return (
    <div
      id="home"
      className="section flex gap-5 px-0 items-center xl:justify-center justify-start flex-wrap 
      bg-white py-20"
    >
      <div className="flex flex-col items-start gap-8 max-w-xl">
        {/* Heading */}
        <div className="sm:text-[2.5rem] text-[2rem] font-extrabold text-gray-900 drop-shadow-lg">
          Delicious <br /> Food is Waiting <br /> For You
        </div>

        {/* Button */}
        <div className="flex gap-4 items-center">
          <button
            onClick={() => navigate("/menu")}
            className="bg-yellow-600  text-white px-6 py-3 rounded-lg shadow-md 
            hover:bg-yellow-700 hover:shadow-lg flex items-center gap-2 transition duration-300 ease-in-out"
          >
            View Menu <FaArrowRight />
          </button>
        </div>

        {/* Navigation Icons */}
        <div className="flex md:gap-6 gap-3">
          {navItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.link)}
              className="bg-white w-14 h-14 text-yellow-900 flex items-center justify-center 
              md:text-3xl text-2xl rounded-full shadow-lg cursor-pointer hover:bg-yellow-500 hover:text-black 
              transform hover:scale-110 transition duration-300 ease-in-out"
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Image */}
      <div className="min-w-[250px] md:w-[600px] justify-self-center mt-8 md:mt-0">
        <img
          src={BannerImage}
          alt="banner-image"
          className="rounded-lg shadow-xl transition-transform duration-500 ease-in-out hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Hero;
