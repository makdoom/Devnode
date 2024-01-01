import { Outlet } from "react-router";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
