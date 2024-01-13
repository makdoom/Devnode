import { PanelRightClose } from "lucide-react";
import { Button } from "./ui/button";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/storeHook";
import { Blog } from "@/types/blog.types";
import Editor from "./Editor";

type WritingAreaPropType = {
  isSidebarOpen: boolean;

  handleToggleSidebar: () => void;
};

const WritingArea = ({
  isSidebarOpen,
  handleToggleSidebar,
}: WritingAreaPropType) => {
  const { blogList } = useAppSelector((state) => state.blogs);
  const params = useParams();

  const [currentBlog, setCurrentBlog] = useState<Blog | null>();

  useEffect(() => {
    if (params?.id) {
      let blog = blogList.find((item) => item._id === params?.id);
      setCurrentBlog(blog ? blog : null);
    }
  }, [params, blogList]);

  return (
    <div className="flex-1 p-4 h-screen overflow-auto">
      <div
        className={`flex items-center ${
          !isSidebarOpen ? "justify-between" : "justify-end"
        }`}
      >
        {!isSidebarOpen && (
          <Button
            variant="secondary"
            size="icon"
            className="group rounded-full bg-transparent hover:bg-purple-100 transition-all duration-200"
            onClick={() => handleToggleSidebar()}
          >
            <PanelRightClose className="h-5 w-5 text-primary cursor-pointer font-light" />
          </Button>
        )}

        <div className="flex gap-2">
          <Button size="sm" variant="secondary">
            Save as Draft
          </Button>
          <Button size="sm">Publish</Button>
        </div>
        {/* <h1>{currentBlog?.title}</h1> */}
      </div>

      <div className="mt-12">
        <Editor />
      </div>
    </div>
  );
};
export default WritingArea;
