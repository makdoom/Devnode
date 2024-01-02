import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Drawer from "./Drawer";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setIsDrawerOpen(true);

  const handleDrawerClose = () => setIsDrawerOpen(false);

  return (
    <div className="w-full py-2 p-4 sm:py-4 flex items-center justify-between border border-secondary sticky top-0 z-10 shadow-sm">
      <div className="w-full">
        <h1 className="font-semibold tracking-wide text-xl md:text-2xl ">
          Dev<span className="text-primary">node</span>
        </h1>
      </div>

      <div className="hidden sm:flex sm:gap-3">
        <Button variant="secondary">Login</Button>
        <Button>Register</Button>
      </div>

      <div className="block sm:hidden">
        <Menu className="h-5 w-5" onClick={handleDrawerOpen} />
        <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose}>
          <div className="px-4 flex flex-col gap-3">
            <Button variant="secondary">Login</Button>
            <Button>Register</Button>
          </div>
        </Drawer>
      </div>
    </div>
  );
};
export default Header;
