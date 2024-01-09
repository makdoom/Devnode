import Sidebar from "@/components/Sidebar";
import WritingArea from "@/components/WritingArea";
import { useAppSelector } from "@/hooks/storeHook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const { isAuthenticated } = useAppSelector((state) => state.authUser);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigate = useNavigate();

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

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
