import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../layouts/HomeLayout";
import { FaMinus, FaPlus } from "react-icons/fa";
import { addItemToCart, removeItemFromCart } from "../store/cartSlice";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const netTotal = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const handleIncreaseQty = (meal) => {
    dispatch(addItemToCart(meal));
  };

  const handleDecreaseQty = (meal) => {
    dispatch(removeItemFromCart(meal));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., sending form data to an API)
    console.log("Form submitted");
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Delivery Address</label>
                <textarea
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  rows="4"
                  placeholder="Enter your delivery address"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
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
                        <td className="py-2">${item.totalPrice.toFixed(2)}</td>
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
                <p className="text-xl font-semibold">${netTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CheckoutPage;
