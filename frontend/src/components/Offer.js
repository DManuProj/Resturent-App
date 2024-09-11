import React from "react";
import Weekend from "../assets/weekend.png";
import Family from "../assets/family.png";
import Summer from "../assets/summer.png";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Mousewheel, Pagination } from "swiper/modules";

const offers = [
  {
    title: "Summer Special",
    description:
      "Enjoy 20% off on all meals this summer! Cool down with our refreshing beverages.",
    imageUrl: Summer,
    buttonLink: "/claim-summer-offer",
  },
  {
    title: "Weekend Fiesta",
    description:
      "Get a free dessert with every meal on weekends. Indulge yourself with our sweet delights.",
    imageUrl: Weekend,
    buttonText: "Book Now",
    buttonLink: "/book-weekend-offer",
  },
  {
    title: "Family Combo",
    description:
      "Special family combo meals at unbeatable prices. Perfect for family dinners!",
    imageUrl: Family,
    buttonText: "Order Now",
    buttonLink: "/order-family-combo",
  },
];

const Offer = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(to right, #fcd34d, #fbbf24, #fef08a)",
      }}
    >
      <div className="space-y-16">
        <Swiper
          direction={"horizontal"}
          slidesPerView={1}
          mousewheel={true}
          modules={[Mousewheel, Pagination]}
        >
          {offers.map((offer, index) => (
            <SwiperSlide key={index}>
              <div
                className={`flex flex-col bg-opacity-70 md:flex-row items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                } gap-8`}
              >
                <div className="w-full md:w-1/2 flex justify-center">
                  <img
                    src={offer.imageUrl}
                    alt={offer.title}
                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                  />
                </div>

                <div
                  className="w-full md:w-1/2 flex flex-col justify-center items-center text-center h-full p-6"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h2 className="text-4xl font-bold text-yellow-900 mb-4">
                    {offer.title}
                  </h2>
                  <p className="text-lg text-yellow-800 mb-6">
                    {offer.description}
                  </p>
                  {offer.title !== "Summer Special" && (
                    <button
                      className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-6 rounded-lg shadow-md transition-colors"
                      onClick={() => (window.location.href = offer.buttonLink)}
                    >
                      {offer.buttonText}
                    </button>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Offer;
