import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./store/store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
import "./index.css";

const clientQuery = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus globally
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={clientQuery}>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </Provider>
  </QueryClientProvider>
);
