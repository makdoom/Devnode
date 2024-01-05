import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers";

// Create store using configurestore
export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    authUser: authReducer,
  },
});

// Rootstate return type while using with useSelector hook
export type RootState = ReturnType<typeof store.getState>;

// To dispatch
export type AppDispatch = typeof store.dispatch;
