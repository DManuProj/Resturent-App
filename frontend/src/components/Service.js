import React from "react";
import Delivery from "../assets/delivery.png";
import Reservation from "../assets/reservation.png";
import Wifi from "../assets/wifi.png";
import Parking from "../assets/parked-car.png"; // Assume you add this icon
import TakeAway from "../assets/take-away.png"; // Assume you add this icon
import Outdoor from "../assets/dinner-table.png"; // Assume you add this icon

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
  {
    icon: Parking,
    title: "Free Parking",
    description:
      "Enjoy convenient parking at our restaurant with no extra cost.",
  },
  {
    icon: TakeAway,
    title: "Take Away",
    description:
      "Enjoy exclusive dishes crafted by our expert chefs, available for a limited time.",
  },
  {
    icon: Outdoor,
    title: "Outdoor Seating",
    description: "Enjoy your meals in our cozy outdoor seating area.",
  },
];

const Service = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            <img
              className="w-24 h-24 mb-4"
              src={service.icon}
              alt={service.title}
            />
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {service.title}
            </h3>
            <p className="text-gray-600 mb-4">{service.description}</p>

            {service.buttonText && (
              <a
                href={service.buttonLink}
                className="bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 transition"
              >
                {service.buttonText}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
