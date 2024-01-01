import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";

const Header = () => {
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

      <Menubar className="sm:hidden p-0 rounded-full border-none">
        <MenubarMenu>
          <MenubarTrigger className="rounded-full p-0 border-none">
            {/* <div className="sm:hidden h-[42px] w-[45px] flex justify-center items-center border border-secondary rounded-full"> */}
            <Menu className="h-5 w-5" />
            {/* </div> */}
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Login</MenubarItem>
            <MenubarItem>Register</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};
export default Header;
