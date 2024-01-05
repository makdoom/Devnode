import { Outlet } from "react-router";
import Header from "./components/Header";
import Cookies from "js-cookie";

const App = () => {
  console.log(Cookies.get("isAuthenticated"));

  return (
    <div className="w-full h-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
