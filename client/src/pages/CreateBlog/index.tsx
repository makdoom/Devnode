import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/storeHook";
import { useCreateBlog } from "@/hooks/useCreateBlog";
import { FilePlus } from "lucide-react";
import { useNavigate } from "react-router";

const CreateBlog = () => {
  const { blogList } = useAppSelector((state) => state.blogs);
  const navigate = useNavigate();
  const createBlogMutation = useCreateBlog((blogId) => {
    navigate(`/blog/create/${blogId}`);
  });

  const handleCreateBlog = () => {
    const newBlogName = blogList.length
      ? `Untitled-${blogList.length + 1}`
      : "Untitled";
    createBlogMutation.mutate(newBlogName);
  };

  return (
    <div className="h-screen ">
      <div className="h-screen flex justify-center items-center flex-col mx-4 text-center">
        <h1 className="text-4xl font-bold mb-2">
          Welcome Back Makdoom Shaikh !
        </h1>
        <p className="text-lg text-muted-foreground font-normal ">
          Dive into your creative journey by exploring your personal space with
          Devnode.
        </p>

        <Button className="mt-8" onClick={handleCreateBlog}>
          <FilePlus className="h-4 w-4 mr-2 flex items-center" />
          Create Blog
        </Button>
      </div>
    </div>
  );
};
export default CreateBlog;
