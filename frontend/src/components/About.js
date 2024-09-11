import React from "react";
import MapComponent from "./Mapcomponent";

const About = () => {
  return (
    <div
      className="min-h-screen flex gap-8 flex-col md:flex-row items-center justify-center p-8"
      style={{
        background: "linear-gradient(to right, #fcd34d, #fbbf24, #fef08a)",
      }}
    >
      {/* Left Side - Text Section */}
      <div className="md:w-1/2 w-full bg-white bg-opacity-80 text-gray-800 rounded-lg shadow-lg p-6 md:pr-8 space-y-6">
        <h1 className="text-4xl font-bold mb-4 text-yellow-900">About Us</h1>
        <p className="text-lg leading-relaxed">
          Welcome to our restaurant! We are dedicated to providing you with the
          finest dining experience. Our chefs use only the freshest ingredients
          to craft dishes that are both delicious and visually appealing.
          Whether you're joining us for a special occasion or just a casual
          meal, we strive to make every visit memorable.
        </p>
        <p className="text-lg leading-relaxed">
          We believe that great food should be accompanied by great service. Our
          team is committed to making sure that your dining experience is as
          enjoyable as possible. Come visit us at one of our locations across
          Sri Lanka.
        </p>
      </div>

      {/* Right Side - Map Section */}
      <div className="md:w-1/2 w-full h-96 md:h-full mt-8 md:mt-0 flex items-center justify-center">
        <div className="w-full h-full rounded-lg shadow-lg overflow-hidden">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default About;
