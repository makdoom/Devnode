import { MoveLeft, PanelRightOpen, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import BlogSection from "./BlogSection";

const list = [
  {
    id: "12",
    title: "Blog 1",
  },
  {
    id: "31",
    title: " Blog 2",
  },
  {
    id: "121",
    title: "Blog 3",
  },
  {
    id: "311",
    title: " Blog 4",
  },
  {
    id: "311",
    title: " Blog 4",
  },
  {
    id: "311",
    title: " Blog 4",
  },
  {
    id: "311",
    title: " Blog 4",
  },
  {
    id: "311",
    title: " Blog 4",
  },
  {
    id: "311",
    title: " Blog 4",
  },
  {
    id: "311",
    title: " Blog 4",
  },
];

type SidebarTypeProps = {
  isSidebarOpen: boolean;

  handleToggleSidebar: () => void;
};

const Sidebar = ({ isSidebarOpen, handleToggleSidebar }: SidebarTypeProps) => {
  return (
    <div
      className={`${
        isSidebarOpen ? "w-[250px]" : "w-0 hidden p-0"
      } border-r p-4 transition-all duration-300 ease-in relative`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Makdoom Shaikh's Blog</h3>
        <Button
          variant="secondary"
          size="icon"
          className="group rounded-full bg-purple-100 hover:bg-purple-100 transition-all duration-200"
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

      <BlogSection type="section" title="Pinned" blogItemList={list} />

      <BlogSection type="section" title="My Drafts" blogItemList={list} />

      <BlogSection type="section" title="Published" blogItemList={list} />

      <div className="absolute bottom-4 left-0 w-full flex justify-center">
        <Button variant="secondary" className="w-full mx-4">
          <MoveLeft className="h-4 w-4 mr-2" />
          Back to Devnode
        </Button>
      </div>
    </div>
  );
};
export default Sidebar;
