import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "@/App";
import Feeds from "@/pages/Feeds";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />} />
      </Route>

      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      <Route path="/feeds" element={<Feeds />} />
    </>
  )
);

export default router;
