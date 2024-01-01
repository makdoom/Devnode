import { configureStore } from "@reduxjs/toolkit";

// Create store using configurestore
export const store = configureStore({
  reducer: {
    // counter: counterReducer,
  },
});

// Rootstate return type while using with useSelector hook
export type RootState = ReturnType<typeof store.getState>;

// To dispatch
export type AppDispatch = typeof store.dispatch;
