import { PanelRightClose } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { Blog } from "@/types/blog.types";
import Editor from "./Editor";
import useDebounce from "@/hooks/useDebounce";
import { updateBlogTitle } from "@/store/reducers/blogReducer";
import useUpdateBlog from "@/hooks/useUpdateBlog";
import { toast } from "sonner";

type WritingAreaPropType = {
  isSidebarOpen: boolean;

  handleToggleSidebar: () => void;
};

const WritingArea = ({
  isSidebarOpen,
  handleToggleSidebar,
}: WritingAreaPropType) => {
  const { blogList } = useAppSelector((state) => state.blogs);
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { data, mutate } = useUpdateBlog();

  const [currentBlog, setCurrentBlog] = useState<Blog>({} as Blog);
  const debounceUpdatedBlog = useDebounce(currentBlog, 500);

  const handleUpdateCurrentBlog = (name: string, value: string | File) => {
    setCurrentBlog((prev) => ({ ...prev, [name]: value }));
  };

  const publishBlogHandler = () => {
    console.log(currentBlog);
    mutate(currentBlog);
  };

  useEffect(() => {
    // Will update title in every 300ms so that it will reflect in sidebar component as well
    if (JSON.stringify(debounceUpdatedBlog).length) {
      dispatch(updateBlogTitle(debounceUpdatedBlog));
    }
  }, [JSON.stringify(debounceUpdatedBlog).length]);

  useEffect(() => {
    if (params?.id) {
      let blog = blogList.find((item) => item._id === params?.id);
      if (blog) {
        setCurrentBlog(blog);
      }
    }
  }, [params, blogList]);

  useEffect(() => {
    if (data) {
      navigate("/feeds");
      toast.success("Blog published successfully");
    }
  }, [data]);

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
          <Button size="sm" onClick={publishBlogHandler}>
            Publish
          </Button>
        </div>
        {/* <h1>{currentBlog?.title}</h1> */}
      </div>

      <div className="mt-12">
        <Editor
          currentBlog={currentBlog}
          handleUpdateCurrentBlog={handleUpdateCurrentBlog}
        />
      </div>
    </div>
  );
};
export default WritingArea;
