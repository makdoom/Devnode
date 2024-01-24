import { MoveLeft, PanelRightOpen, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router-dom";
import BlogItem from "./BlogItem";
import BlogSection from "./BlogSection";
import useGetBlogs from "@/hooks/useGetBlogs";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { toggleSidebar } from "@/store/reducers/blogReducer";
import { useCreateBlog } from "@/hooks/useCreateBlog";

const Sidebar = () => {
  const navigate = useNavigate();
  const { blogList, isSidebarOpen } = useAppSelector((state) => state.blogs);
  const { isLoading } = useGetBlogs();
  const dispatch = useAppDispatch();

  const handleToggleSidebar = () => dispatch(toggleSidebar());

  const createBlogMutation = useCreateBlog((blogId) => {
    navigate(`/blog/create/${blogId}`);
  });

  const handleCreateBlog = () => {
    const newBlogName = blogList.length
      ? `Untitled-${blogList.length + 1}`
      : "Untitled";
    createBlogMutation.mutate(newBlogName);
  };

  console.log({
    pinned: blogList.filter((item) => item.isPinned),
    blogs: blogList,
  });
  return (
    <div
      className={`duration-300 ease-in-out transform ${
        isSidebarOpen
          ? "translate-x-0  w-64 p-4 border-r"
          : "-translate-x-full w-0 p-0 opacity-0"
      } relative top-0 left-0 h-full flex flex-col gap-3`}
    >
      <div className="flex items-center justify-between">
        <h3
          className={`text-sm font-semibold ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          Makdoom Shaikh's Blog
        </h3>
        <Button
          variant="secondary"
          size="icon"
          className="group rounded-full bg-transparent hover:bg-purple-100 transition-all duration-200"
          onClick={() => handleToggleSidebar()}
        >
          <PanelRightOpen className="h-5 w-5 text-primary cursor-pointer font-light" />
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 border rounded-md px-2">
        <Search className="h-5 w-5" />
        <Input
          placeholder="Search Blog"
          className="border-none focus-visible:ring-offset-0 focus:border-none focus-visible:ring-transparent p-0"
        />
      </div>

      <div className="">
        <BlogItem type="new" title="New Blog" onClick={handleCreateBlog} />
      </div>

      <div className="mt-3 flex-1 max-h-fit overflow-auto flex flex-col gap-5">
        <div>
          <BlogSection
            isLoading={isLoading}
            type="Pinned"
            emptyText="Your pinned drafts would appear here."
            blogList={blogList.filter((blog) => blog.isPinned)}
          />
        </div>

        <div>
          <BlogSection
            isLoading={isLoading}
            type="Drafts"
            emptyText="You don't have any drafts yet."
            blogList={blogList.filter((blog) => blog.isDraft)}
          />
        </div>

        <div>
          <BlogSection
            isLoading={isLoading}
            type="Published"
            emptyText="You have not published anything yet."
            blogList={blogList.filter((blog) => blog.isPublished)}
          />
        </div>
      </div>
      {/* <BlogSection type="single" title="Create New Blog" /> */}

      {/* <div className="flex-1"> */}
      {/* <BlogSection type="section" title="Pinned" blogItemList={list} /> */}

      {/* <BlogSection type="section" title="My Drafts" blogItemList={list} /> */}

      {/* <BlogSection
        type="section"
        title="My Drafts"
        blogList={blogList?.filter((item) => item.isDraft)}
      />

      <BlogSection
        type="section"
        title="Published"
        blogList={blogList?.filter((item) => item.isPublished)}
      /> */}

      {/* </div> */}

      <div className="flex justify-center">
        <Button variant="secondary" className="w-full">
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
