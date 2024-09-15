import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../layouts/HomeLayout";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../store/cartSlice"; // clearCart action
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinenr";
import { setIsLoading } from "../store/userSlice";
import { useNavigate } from "react-router";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { user, isLoading } = useSelector((state) => state.user);
  const netTotal = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize formData for customer information and order status
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const initialOrderData = {
    orderDate: new Date(),
    total: netTotal,
    status: "PENDING",
    customer: null,
    orderDetails: [],
  };

  const [orderData, setOrderData] = useState(initialOrderData);

  // Populate form data and orderData with user and cart information
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.userName || "",
        email: user.userEmail || "",
        phone: user.userContact || "",
        address: user.userAddress || "",
      });

      setOrderData((prevState) => ({
        ...prevState,
        customer: user.userId || null,
      }));
    }

    if (cartItems) {
      const orderDetails = cartItems.map((item) => ({
        mealId: item.id,
        mealName: item.name,
        qty: item.quantity,
        amount: item.totalPrice,
      }));
      setOrderData((prevState) => ({
        ...prevState,
        orderDetails,
        total: netTotal,
      }));
    }
  }, [user, cartItems, netTotal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData(initialFormData); // Reset form data
    setOrderData(initialOrderData); // Reset order data
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));

    const order = {
      ...orderData,
      total: netTotal,
    };

    try {
      const response = await axios.post(
        "http://localhost:8089/api/v1/order/save",
        order
      );
      if (response.status === 201) {
        toast.success("Order placed successfully!");
        resetForm(); // Reset the form after success
        dispatch(clearCart()); // Clear cart after placing order

        setTimeout(() => {
          navigate("/menu");
        }, 1500);
      }

      console.log(response);
    } catch (error) {
      console.error("Error when ordering:", error);
    } finally {
      dispatch(setIsLoading(false)); // Stop loading spinner
    }
  };

  const handleIncreaseQty = (meal) => {
    dispatch(addItemToCart(meal));
  };

  const handleDecreaseQty = (meal) => {
    dispatch(removeItemFromCart(meal));
  };

  return (
    <HomeLayout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Side - User Details */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Your Details</h2>
            <form
              className="bg-white p-6 rounded-lg shadow-md"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Delivery Address</label>
                <textarea
                  name="address"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  rows="4"
                  placeholder="Enter your delivery address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-yellow-600  text-white px-6 py-3 rounded-lg shadow-md 
            hover:bg-yellow-700 hover:shadow-lg flex items-center gap-2 transition duration-300 ease-in-out"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-700 border-b">
                    <th className="py-2">Meal Name</th>
                    <th className="py-2">Qty</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{item.name}</td>
                        <td className="py-2 flex items-center">
                          <FaMinus
                            className="cursor-pointer text-red-600 mr-2"
                            onClick={() => handleDecreaseQty(item)}
                          />
                          <span className="mx-2">{item.quantity}</span>
                          <FaPlus
                            className="cursor-pointer text-green-600 ml-2"
                            onClick={() => handleIncreaseQty(item)}
                          />
                        </td>
                        <td className="py-2">
                          Rs {item.totalPrice.toFixed(2)}
                        </td>
                        <td className="py-2">
                          <IoMdCloseCircle
                            onClick={() => dispatch(removeItemFromCart(item))}
                            className="text-red-600 cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        Your cart is empty.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Net Total */}
              <div className="mt-6 flex justify-between items-center">
                <p className="text-xl font-semibold">Net Total:</p>
                <p className="text-xl font-semibold">
                  Rs {netTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
      {isLoading && <LoadingSpinner />}
    </HomeLayout>
  );
};

export default CheckoutPage;
