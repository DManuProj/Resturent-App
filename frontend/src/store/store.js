import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice"; // Import the cart slice

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice, // Add the cart slice to the store
  },
});
