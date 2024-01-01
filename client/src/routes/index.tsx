import App from "@/App";
import Hero from "@/components/Hero";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Hero />} />
    </Route>
  )
);

export default router;
