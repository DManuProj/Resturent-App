import React from "react";
import Delivery from "../assets/delivery.png";
import Reservation from "../assets/reservation.png";
import Wifi from "../assets/wifi.png";

const services = [
  {
    icon: Delivery,
    title: "Fast Delivery",
    description:
      "Get your food delivered to your doorstep quickly and efficiently.",
    buttonText: "Order Now",
    buttonLink: "/order", // Add your link for the order page
  },
  {
    icon: Reservation,
    title: "Reservation",
    description:
      "Book a table in advance and enjoy a hassle-free dining experience.",
    buttonText: "Book Now",
    buttonLink: "/reservation", // Add your link for the reservation page
  },
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    description: "Stay connected with our complimentary high-speed Wi-Fi.",
  },
];

const Service = () => {
  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-white">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center cursor-pointer"
          >
            <img
              className="w-24 h-24 mb-4"
              src={service.icon}
              alt={service.title}
            />
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-400 mb-4">{service.description}</p>

            {service.buttonText && (
              <button className="btn">{service.buttonText}</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
