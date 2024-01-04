import App from "@/App";
import Hero from "@/components/Hero";
import Feeds from "@/pages/Feeds";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<Hero />} />
      </Route>

      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      <Route path="/feeds" element={<Feeds />} />
    </>
  )
);

export default router;
