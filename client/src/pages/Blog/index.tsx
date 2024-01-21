import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import useUpdateBlog from "@/hooks/useUpdateBlog";
import { toggleSidebar } from "@/store/reducers/blogReducer";
import { PanelRightOpen } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const Blog = () => {
  const { isAuthenticated } = useAppSelector((state) => state.authUser);
  const { isSidebarOpen, blogList, selectedBlogId } = useAppSelector(
    (state) => state.blogs
  );

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createBlogMutation = useUpdateBlog(() => {
    toast.success("Blog published successfully !");
    navigate("/feeds");
  });

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const saveDraftHandler = () => {};

  const publishBlogHandler = () => {
    const blogToPublish = blogList.find((item) => item._id === selectedBlogId);
    if (blogToPublish) {
      createBlogMutation.mutate({
        ...blogToPublish,
        isPublished: true,
        isDraft: false,
      });
    }
  };

  useEffect(() => {
    navigate("/blog/create");
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  if (!isAuthenticated) return <div></div>;

  return (
    <div className="w-screen h-screen overflow-hidden flex">
      <Sidebar />

      <div className="flex-1">
        <div
          className={`p-3 flex items-center ${
            isSidebarOpen ? "justify-end" : "justify-between"
          }
          ${params?.blogId && "border-b border-secondary"}
          `}
        >
          {!isSidebarOpen && (
            <Button
              variant="secondary"
              size="icon"
              className="group rounded-full bg-transparent hover:bg-purple-100 transition-all duration-200"
              onClick={() => handleToggleSidebar()}
            >
              <PanelRightOpen className="h-5 w-5 text-primary cursor-pointer font-light" />
            </Button>
          )}

          {params?.blogId && (
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={saveDraftHandler}>
                Save as Draft
              </Button>
              <Button size="sm" onClick={publishBlogHandler}>
                Publish
              </Button>
            </div>
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default Blog;
