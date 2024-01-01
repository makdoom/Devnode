import { Menu } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="w-full py-2 p-4 flex items-center justify-between border border-secondary sticky top-0 z-10">
      <div className="w-full">
        <h1 className="font-semibold tracking-wide text-xl md:text-2xl ">
          Dev<span className="text-primary">node</span>
        </h1>
      </div>

      <div className="hidden sm:flex sm:gap-3">
        <Button variant="secondary">Login</Button>
        <Button>Register</Button>
      </div>

      <div className="sm:hidden h-[42px] w-[45px] flex justify-center items-center border border-secondary rounded-full">
        <Menu className="h-5 w-5" />
      </div>
    </div>
  );
};
export default Header;
