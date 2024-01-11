import Sidebar from "@/components/Sidebar";
import WritingArea from "@/components/WritingArea";
import { useAppSelector } from "@/hooks/storeHook";
import { useGetBlogs } from "@/hooks/useGetBlogs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.authUser);

  const { data: response } = useGetBlogs();
  console.log(response);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    let blogToShow = response?.data.find(
      (item) => item.title.toLowerCase() === "untitled"
    );
    if (blogToShow) {
      navigate(`/create-blog/${blogToShow._id}`);
    } else {
      navigate(`/create-blog/${response?.data[0]?._id}`);
    }
  }, [response]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  if (!isAuthenticated) return <div></div>;

  return (
    <div className="w-screen h-screen flex">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleToggleSidebar={handleToggleSidebar}
      />
      <WritingArea
        isSidebarOpen={isSidebarOpen}
        handleToggleSidebar={handleToggleSidebar}
      />
    </div>
  );
};
export default CreatePost;
