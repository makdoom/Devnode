import Sidebar from "@/components/Sidebar";
import WritingArea from "@/components/WritingArea";
import { useState } from "react";

const CreatePost = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

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
