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
import CreatePost from "@/pages/CreatePost";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />} />
        <Route path="/feeds" element={<Feeds />} />
      </Route>

      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/create-blog" element={<CreatePost />} />
      <Route path="/create-blog/:id" element={<CreatePost />} />
    </>
  )
);

export default router;
