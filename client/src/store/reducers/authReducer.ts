import { User } from "@/types/user.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

type authStateType = {
  isAuthenticated: boolean;
  user: User | null;
};

const initialState: authStateType = {
  isAuthenticated: Cookies.get("isAuthenticated") ? true : false,
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    authLogout: (state) => {
      (state.isAuthenticated = false), (state.user = null);
    },
  },
});

export const { setAuthUser, authLogout } = authSlice.actions;

export default authSlice.reducer;
