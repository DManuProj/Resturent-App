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
    buttonText: "Claim Offer",
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
    <div className="bg-gray-700 min-h-screen  text-white">
      <div className="space-y-16">
        <Swiper
          direction={"horizontal"}
          slidesPerView={1}
          mousewheel={true}
          modules={[Mousewheel]}
        >
          {offers.map((offer, index) => (
            <SwiperSlide>
              <div
                key={index}
                className={`flex flex-col bg-slate-500 md:flex-row items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                } gap-8`}
              >
                <div className="w-full md:w-1/2 max-h- flex justify-center">
                  <img
                    src={offer.imageUrl}
                    alt={offer.title}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center h-full">
                  <h2 className="text-3xl font-semibold mb-4">{offer.title}</h2>
                  <p className="text-lg mb-4">{offer.description}</p>
                  <button className="btn">{offer.buttonText}</button>
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
