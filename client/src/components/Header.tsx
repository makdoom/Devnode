import { Loader, LogOut, Menu, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import Drawer from "./Drawer";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLogout } from "@/hooks/useLogout";
import Cookies from "js-cookie";
import { authLogout } from "@/store/reducers/authReducer";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state?.authUser);

  const { isLoading, mutate, data } = useLogout();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  const navigatToHome = () => navigate("/");

  const handleLogout = () => {
    mutate();
  };

  useEffect(() => {
    if (data?.data.statusCode) {
      Cookies.remove("isAuthenticated");
      navigatToHome();
      dispatch(authLogout());
    }
  }, [data]);

  return (
    <div className="w-full py-2 p-4 sm:py-4 flex items-center justify-between border-b bg-[rgba(255,255,255,0.6)] backdrop-blur-[8px] border-secondary sticky top-0 z-10 shadow-sm">
      <div className="w-full">
        <h1
          className="font-semibold text-xl md:text-2xl cursor-pointer contents"
          onClick={navigatToHome}
        >
          Dev<span className="text-primary">node</span>
        </h1>
      </div>

      {isAuthenticated ? (
        <div className="flex gap-2">
          <Link to="/blog/create">
            <Button>
              <Pencil className="h-4 w-4 mr-2" />
              Write
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <div className="flex items-center gap-2">
                  <Avatar className="cursor-pointer h-10 w-10">
                    <AvatarImage
                      sizes="2xl"
                      src="https://github.com/shadcn.png"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h3>Makdoom Shaikh</h3>
                    <p className="text-muted-foreground text-xs">@makdoom</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                disabled={isLoading}
                onClick={handleLogout}
              >
                {isLoading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4 mr-2 text-red-500" />
                )}
                <span className="text-red-500">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
