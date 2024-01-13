import { MoveLeft, PanelRightOpen, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";

import BlogSection from "./BlogSection";

type SidebarTypeProps = {
  isSidebarOpen: boolean;

  handleToggleSidebar: () => void;
};

const Sidebar = ({ isSidebarOpen, handleToggleSidebar }: SidebarTypeProps) => {
  return (
    <div
      className={`${
        isSidebarOpen ? "w-[250px]" : "w-0 hidden p-0"
      } border-r p-3 transition-all duration-300 ease-in relative flex flex-col`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Makdoom Shaikh's Blog</h3>
        <Button
          variant="secondary"
          size="icon"
          className="group rounded-full bg-transparent hover:bg-purple-100 transition-all duration-200"
          onClick={() => handleToggleSidebar()}
        >
          <PanelRightOpen className="h-5 w-5 text-primary cursor-pointer font-light" />
        </Button>
      </div>

      <div className="my-4 flex items-center justify-center gap-2 border rounded-md px-2">
        <Search className="h-5 w-5" />
        <Input
          placeholder="Search Blog"
          className="border-none focus-visible:ring-offset-0 focus:border-none focus-visible:ring-transparent p-0"
        />
      </div>

      <BlogSection type="single" title="Create New Blog" />

      {/* <div className="flex-1"> */}
      {/* <BlogSection type="section" title="Pinned" blogItemList={list} /> */}

      {/* <BlogSection type="section" title="My Drafts" blogItemList={list} /> */}

      <BlogSection type="section" title="Published" />
      {/* </div> */}

      <div className="absolute bottom-4 left-0 w-full flex justify-center">
        <Button variant="secondary" className="w-full mx-4">
          <Link to="/feeds" className="flex items-center ">
            <MoveLeft className="h-4 w-4 mr-2" />
            Back to Devnode
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default Sidebar;
