import React from "react";
import MapComponent from "./Mapcomponent";

const About = () => {
  return (
    <div className="bg-gray-700 min-h-screen flex flex-col md:flex-row items-center justify-center p-8">
      {/* Left Side - Text Section */}
      <div className="md:w-1/2 text-white space-y-6 md:pr-8">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg">
          Welcome to our restaurant! We are dedicated to providing you with the
          finest dining experience. Our chefs use only the freshest ingredients
          to craft dishes that are both delicious and visually appealing.
          Whether you're joining us for a special occasion or just a casual
          meal, we strive to make every visit memorable.
        </p>
        <p className="text-lg">
          We believe that great food should be accompanied by great service. Our
          team is committed to making sure that your dining experience is as
          enjoyable as possible. Come visit us at one of our locations across
          Sri Lanka.
        </p>
      </div>
      {/* Right Side - Map Section */}
      <div className="md:w-1/2 w-full h-96 md:h-full mt-8 md:mt-0">
        <MapComponent />
      </div>
    </div>
  );
};

export default About;
