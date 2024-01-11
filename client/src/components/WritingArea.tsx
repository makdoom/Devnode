import { PanelRightClose } from "lucide-react";
import { Button } from "./ui/button";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/storeHook";
import { Blog } from "@/types/blog.types";

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
    <div className="flex-1 p-4">
      <div>
        {!isSidebarOpen && (
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-transparent hover:bg-secondary transition-all duration-200"
            onClick={() => handleToggleSidebar()}
          >
            <PanelRightClose className="h-5 w-5 text-muted-foreground cursor-pointer font-light" />
          </Button>
        )}

        <h1>{currentBlog?.title}</h1>
      </div>
    </div>
  );
};
export default WritingArea;
