import App from "@/App";
import Hero from "@/components/Hero";
import Login from "@/pages/Login";
import Register from "@/pages/Register/Register";
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
    </>
  )
);

export default router;
