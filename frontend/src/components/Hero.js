import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { PiBowlFoodFill } from "react-icons/pi";
import { GiNoodles } from "react-icons/gi";
import { FaHamburger } from "react-icons/fa";
import { GiCakeSlice } from "react-icons/gi";
import BannerImage from "../assets/home_banner.png";

const Hero = () => {
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
      className="section flex px-0 items-center xl:justify-center justify-start flex-wrap"
    >
      <div className="flex flex-col items-start gap-10">
        <div className=" sm:text-[2.5rem] text-[1.8rem] font-bold">
          Delicious <br /> Food is Waiting <br /> For you
        </div>
        <div className=" flex gap-2 items-center">
          <button className="btn">
            View Menu <FaArrowRight />
          </button>
        </div>

        <div className="flex md:gap-6 gap-2">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="bg-black w-12 h-12 text-white flex items-center justify-center md:text-3xl
            text-xl rounded-md"
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>
      <div className="min-w-[200px] md:w-[650px] justify-self-center">
        <img src={BannerImage} alt="banner-image" />
      </div>
    </div>
  );
};

export default Hero;
