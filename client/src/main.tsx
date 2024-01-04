import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import { store } from "./store/store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const clientQuery = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={clientQuery}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
