import React, { useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { Tabs, Tab, Pagination } from "@mui/material";
import mealBackground from "../assets/meals_background.jpg"; // Adjust the path to your asset
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);

  const tabs = ["All", "Noodles", "Fried Rices", "Juices", "Cakes"];
  const itemsPerPage = 6; // Number of items per page(size)

  const foodItems = {
    All: [
      "Item 1",
      "Item 2",
      "Item 3",
      "Item 4",
      "Item 5",
      "Item 6",
      "Item 7",
      "Item 8",
    ],
    Noodles: ["Noodle 1", "Noodle 2", "Noodle 3"],
    "Fried Rices": ["Fried Rice 1", "Fried Rice 2", "Fried Rice 3"],
    Juices: ["Juice 1", "Juice 2"],
    Cakes: ["Cake 1", "Cake 2", "Cake 3"],
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1); // Reset pagination to first page when tab changes
  };

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const currentItems = foodItems[tabs[activeTab]].slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <HomeLayout>
      {/* Background Image Section */}
      <div className="relative w-full h-auto bg-gray-800">
        {/* Background Image */}
        <div
          style={{
            backgroundImage: `url(${mealBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "60vh", // You can adjust this height
            display: "flex", // Enable flexbox
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            position: "relative",
          }}
        >
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Header Text */}
          <div className="relative z-10 text-white text-center p-8">
            <h1 className="text-5xl font-bold mb-4">Our Delicious Menu</h1>
            <p className="text-lg">
              Experience the taste of our exquisite dishes.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs for Food Categories */}
      <div className="bg-gray-800 w-full flex flex-col items-center p-8">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="inherit"
          centered
          className="relative z-10 mb-8"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab} />
          ))}
        </Tabs>

        {/* Food Items */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-full mx-auto mb-8 z-10">
          {currentItems.map((item, index) => (
            // <div
            //   key={index}
            //   className="bg-white p-4 rounded-lg shadow-lg text-center text-gray-800"
            // >
            //   {item}
            // </div>
            <Link to={``}>
              <article className="flex transform transition-transform duration-300 hover:scale-105 flex-col justify-between h-full p-3 dark:border-white rounded-lg shadow-lg shadow-gray-700 dark:bg-gray-900">
                <div className="w-full flex justify-center items-center rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    className="w-full h-48 md:h-60 lg:h-52 object-cover"
                    src={""}
                    alt="blog read"
                  />
                </div>
                <div className="flex dark:text-white gap-2  text-gray-600 mt-4">
                  <h3 className="text-lg md:text-xl dark:text-white font-semibold leading-6 text-gray-900">
                    title
                  </h3>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <h3 className="text-lg md:text-xl dark:text-white font-semibold leading-6 text-gray-900">
                    price
                  </h3>
                  <div className=" flex  items-center gap-2 mt-2 dark:text-white text-sm md:text-base leading-6 text-gray-600 line-clamp-3">
                    add to cart
                    <IoMdAdd />
                  </div>
                </div>
                {/* <Link to={`/writer/${user?._id}`}>
          <div className="mt-5 flex items-center gap-4">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={profileImg}
              alt="profile"
            />
            <div className="text-sm flex flex-col">
              <p className="font-semibold text-base">{name}</p>
              <p className="dark:text-white text-gray-800 text-sm leading-6">
                {role}
              </p>
            </div>
          </div>
        </Link> */}
              </article>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          count={Math.ceil(foodItems[tabs[activeTab]].length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          className="relative z-10 text-white"
        />
      </div>
    </HomeLayout>
  );
};

export default MenuPage;
