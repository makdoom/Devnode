import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import useGetAllPublishedBlogs from "@/hooks/useGetAllPublishBlogs";
import { Blog } from "@/types/blog.types";
// import Cookies from "js-cookie";
import { Medal, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

type PostTabType = "Personalized" | "Trending" | "Featured";

const Feeds = () => {
  const { data: blogList } = useGetAllPublishedBlogs();

  const navigate = useNavigate();
  const [postTab, setPostTab] = useState<PostTabType>("Personalized");

  const handleSetPostTab = (tabType: PostTabType) => setPostTab(tabType);

  const navigateToPreviewBlog = (username: string, blogId: string) => {
    if (username && blogId) {
      console.log(username, blogId);
      navigate(`/blog/${username}/${blogId}`);
    }
  };

  return (
    <div className="max-w-[1200px] m-auto py-4 flex gap-4">
      <div className="flex-[0.7]">
        <div className="flex gap-3 my-2">
          <Button
            size="sm"
            className={`${
              postTab === "Personalized"
                ? "bg-purple-100 text-primary"
                : "bg-transparent text-secondary-foreground"
            } hover:text-primary hover:bg-purple-100`}
            onClick={() => handleSetPostTab("Personalized")}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Personalized
          </Button>
          <Button
            size="sm"
            className={`${
              postTab === "Trending"
                ? "bg-purple-100 text-primary"
                : "bg-transparent text-secondary-foreground"
            }  hover:text-primary hover:bg-purple-100`}
            onClick={() => handleSetPostTab("Trending")}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Trending
          </Button>
          <Button
            size="sm"
            className={`${
              postTab === "Featured"
                ? "bg-purple-100 text-primary"
                : "bg-transparent text-secondary-foreground"
            } hover:text-primary hover:bg-purple-100`}
            onClick={() => handleSetPostTab("Featured")}
          >
            <Medal className="h-4 w-4 mr-2" />
            Featured
          </Button>
        </div>

        <div className="mt-5">
          {blogList?.map((blog: Blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              navigateToPreviewBlog={navigateToPreviewBlog}
            />
          ))}
        </div>
      </div>
      <div className="flex-[0.3] relative">
        <div className="border h-[200px] sticky top-[90px]">static</div>
      </div>
    </div>
  );
};
export default Feeds;
