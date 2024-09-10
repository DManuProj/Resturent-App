import React from "react";
import HomeLayout from "../layouts/HomeLayout";

export const CheckoutPage = () => {
  const user = {
    name: "John Doe",
    address: "123 Foodie Street, Tasteville",
    contact: "+123 456 7890",
  };

  const cartItems = [
    { name: "Spaghetti Carbonara", qty: 2, amount: 15.99 },
    { name: "Fried Chicken", qty: 1, amount: 12.49 },
    { name: "Lemonade", qty: 3, amount: 4.99 },
  ];

  const netTotal = cartItems.reduce(
    (total, item) => total + item.amount * item.qty,
    0
  );

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
        <div className="container max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

          {/* Checkout Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side - User Details */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Name:</p>
                  <p>{user.name}</p>
                </div>
                <div>
                  <p className="font-medium">Address:</p>
                  <p>{user.address}</p>
                </div>
                <div>
                  <p className="font-medium">Contact:</p>
                  <p>{user.contact}</p>
                </div>
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              {/* Order items table */}
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2">Meal Name</th>
                      <th className="py-2 text-center">Qty</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{item.name}</td>
                        <td className="py-2 text-center">{item.qty}</td>
                        <td className="py-2 text-right">
                          ${(item.amount * item.qty).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Net Total */}
              <div className="mt-6 text-right">
                <p className="text-xl font-bold">
                  Net Total: ${netTotal.toFixed(2)}
                </p>
              </div>

              {/* Payment Button */}
              <div className="mt-6 text-right">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition">
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CheckoutPage;
