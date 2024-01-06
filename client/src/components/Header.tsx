import { Menu, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Drawer from "./Drawer";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/storeHook";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state?.authUser);

  const navigate = useNavigate();

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  const navigatToHome = () => navigate("/");

  return (
    <div className="w-full py-2 p-4 sm:py-4 flex items-center justify-between border border-secondary sticky top-0 z-10 shadow-sm">
      <div className="w-full">
        <h1
          className="font-semibold text-xl md:text-2xl cursor-pointer"
          onClick={navigatToHome}
        >
          Dev<span className="text-primary">node</span>
        </h1>
      </div>

      {isAuthenticated ? (
        <div className="flex gap-2">
          <Link to="/create">
            <Button>
              <Pencil className="h-4 w-4 mr-2" />
              Write
            </Button>
          </Link>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <div className="hidden sm:flex sm:gap-3">
          <Link to="/auth/login">
            <Button variant="secondary">Login</Button>
          </Link>
          <Link to="/auth/register">
            <Button>Register</Button>
          </Link>
        </div>
      )}

      {/* For Mobile screens */}
      <div className="block sm:hidden">
        <Menu className="h-5 w-5" onClick={handleDrawerOpen} />
        <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose}>
          <div className="px-4 flex flex-col gap-3">
            <Link to="/auth/login" className="w-full">
              <Button variant="secondary" className="w-full">
                Login
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button className="w-full">Register</Button>
            </Link>
          </div>
        </Drawer>
      </div>
    </div>
  );
};
export default Header;
