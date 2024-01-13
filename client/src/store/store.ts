import { configureStore } from "@reduxjs/toolkit";
import { authReducer, blogReducer } from "./reducers";

// Create store using configurestore
export const store = configureStore({
  reducer: {
    authUser: authReducer,
    blogs: blogReducer,
  },
});

// Rootstate return type while using with useSelector hook
export type RootState = ReturnType<typeof store.getState>;

// To dispatch
export type AppDispatch = typeof store.dispatch;
