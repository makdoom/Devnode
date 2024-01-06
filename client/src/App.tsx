import { Outlet, useNavigate } from "react-router";
import Header from "./components/Header";
import { useEffect } from "react";
import { useAppSelector } from "./hooks/storeHook";

const App = () => {
  const { isAuthenticated } = useAppSelector((state) => state.authUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/feeds");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="w-full h-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
