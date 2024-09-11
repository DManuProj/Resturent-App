import React, { useEffect, useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { Tabs, Tab, Pagination } from "@mui/material";
import mealBackground from "../assets/meals_background.jpg"; // Adjust the path to your asset
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinenr"; // Fixed import name
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../store/cartSlice";

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const [meals, setMeals] = useState([]);
  const { user, isLoading } = useSelector((state) => state.user);

  const cartItems = useSelector((state) => state.cart.items);
  const netTotal = useSelector((state) => state.cart.totalAmount);

  console.log("cart items" + cartItems);
  console.log("netTotal" + netTotal);

  const dispatch = useDispatch();
  // Function to handle adding items to cart
  const handleAddToCart = (meal) => {
    dispatch(
      addItemToCart({
        id: meal.mealId,
        name: meal.mealName,
        price: meal.mealPrice,
      })
    );
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios(
          "http://localhost:8089/api/v1/meal/get-meals"
        );
        setMeals(response.data.data);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);

  console.log(meals);

  const tabs = ["All", "NOODLES", "FRIED_RICE", "JUICE", "CAKE"];
  const itemsPerPage = 6; // Number of items per page

  // Filter meals based on the selected category
  const getFilteredMeals = (category) => {
    if (category === "All") {
      return meals;
    }
    return meals.filter((meal) => meal.mealCategory === category);
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

  // Get current items based on the active tab and page
  const filteredMeals = getFilteredMeals(tabs[activeTab]);
  const currentItems = filteredMeals.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <HomeLayout>
      {/* Background Image Section */}
      <div className="relative w-full h-auto">
        {/* Background Image */}
        <div
          style={{
            backgroundImage: `url(${mealBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "60vh", // Adjust this height as needed
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-yellow-900 opacity-40"></div>

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
      <div className="bg-gradient-to-r w-full flex flex-col items-center p-8">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="inherit"
          centered
          className="relative z-10 mb-8 text-black font-bold"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab}
              className={`text-lg ${
                activeTab === index ? "text-yellow-600" : "text-gray-800"
              }`}
            />
          ))}
        </Tabs>

        {/* Food Items */}
        <div className="relative bg-white shadow-lg rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-full mx-auto mb-8 z-10 p-4">
          {currentItems.map((meal) => (
            <div key={meal.mealId}>
              <article className="flex bg-white transform transition-transform duration-300 hover:scale-105 flex-col justify-between h-full p-4 rounded-lg shadow-lg border border-yellow-300">
                <div className="w-full flex justify-center items-center rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    className="w-full h-48 md:h-60 lg:h-52 object-cover"
                    src={meal.mealImage || ""} // Assuming there is an 'image' field
                    alt={meal.mealName}
                  />
                </div>
                <div className="flex text-gray-800 gap-2 mt-4">
                  <h3 className="text-lg md:text-xl font-semibold leading-6">
                    {meal.mealName}
                  </h3>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <h3 className="text-lg md:text-xl font-semibold leading-6 text-yellow-600">
                    ${meal.mealPrice}
                  </h3>
                  <div className="flex cursor-pointer items-center gap-2 mt-2 text-sm md:text-base leading-6">
                    <span
                      className="flex items-center gap-1"
                      onClick={() => handleAddToCart(meal)}
                    >
                      Add to Cart
                      <IoMdAdd className="text-yellow-600" />
                    </span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          count={Math.ceil(filteredMeals.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          className="relative z-10 text-yellow-800"
        />
      </div>
      <Toaster position="bottom-right" />
      {isLoading && <LoadingSpinner />}
    </HomeLayout>
  );
};

export default MenuPage;
