import { Outlet } from "react-router";
import Header from "./components/Header";
import { useEffect } from "react";
import Axios from "./api/interceptor";
// import axios from "axios";

const App = () => {
  useEffect(() => {
    (async () => {
      const res = await Axios.get("/users");
      console.log(res);
    })();
  }, []);

  return (
    <div className="w-full h-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
