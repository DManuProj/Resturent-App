import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const userData = {
        userId: action.payload.user.userId,
        userName: action.payload.user.userName,
        token: "dummy-token",
        userType: action.payload.user.userType,
        userContact: action.payload.user.userContact,
        userAddress: action.payload.user.userAddress,
      };

      state.user = userData;

      localStorage.setItem("user", JSON.stringify(userData));
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { signOut, signIn, setIsLoading } = userSlice.actions;
export default userSlice.reducer;
